import { Exclude, Expose, Type } from 'class-transformer';
import { TaskStatus } from '../task-status.enum';
import { UserDto } from '../../user/dto/user.dto';

@Exclude()
export class TaskDto {

    @Expose()
    title: string;

    @Expose()
    description: string;
  
    @Expose()
    status: TaskStatus;
  
    @Expose()
    userId: number;
    
    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}