import { Exclude, Expose, Type } from 'class-transformer';
import { UserRole } from '../user-role.enum';
import { TaskDto } from '../../tasks/dto/task.dto';

@Exclude()
export class UserDto {

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone?: string;

    password: string;

    // @Expose()
    // @Type(() => TaskDto)
    // tasks: TaskDto[];

    @Expose()
    role: UserRole;
}