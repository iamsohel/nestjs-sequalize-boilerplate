import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task,
      ) {}
    
      create(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN
        return task.save();
      }
    
      async findAll(): Promise<Task[]> {
        return this.taskModel.findAll();
      }
    
      async findOne(id: number): Promise<Task> {
        let task =  await this.taskModel.findOne({
          where: {
            id
          },
        });
        if(!task){
          throw new NotFoundException(`task with id: ${id} not found`);
        }
        return task;
      }

      async update(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.findOne(id);
        if(!task){
          throw new NotFoundException(`task with id: ${id} not found`);
        }
        console.log(status, task)
        task.status = status;
        return task.save();
      }
    
      async remove(id: number): Promise<void> {
        const task = await this.findOne(id);
        if(!task){
          throw new NotFoundException(`task with id: ${id} not found`);
        }
        await task.destroy();
      }
}
