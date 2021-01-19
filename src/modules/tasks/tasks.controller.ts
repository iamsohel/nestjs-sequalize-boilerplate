import { User } from './../user/user.model';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/status-validation.pipe';
import { Task } from './task.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators';


@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto, @AuthUser() user: User): Promise<Task[]>{
        console.log("user:: ",user)
        if(Object.keys(filterDto).length){
            return this.taskService.findAll();
        } else {
            return this.taskService.findAll();
        }
    }

    @Get("/:id")
    @UseGuards(AuthGuard())
    getTaskById(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User): Promise<Task> {
        console.log("user:: ",user)
        return this.taskService.findOne(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.taskService.create(createTaskDto)
    }

    @Put("/:id/status")
    updateTask(@Param("id") id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
        return this.taskService.update(id, status)
    }

    @Delete("/:id")
    deleteTask(@Param('id') id: number){
        return this.taskService.remove(id);
    }

}
