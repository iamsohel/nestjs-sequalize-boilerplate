import { Column, Model, Table} from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';

@Table
export class Task extends Model<Task> {

  @Column
  title: string

  @Column
  description: string

  @Column
  status: TaskStatus
}