import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SequelizeModule.forFeature([Task]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
