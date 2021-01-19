import { UserRole } from './user-role.enum';
import { Column, Model, Table} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column
    firstName: string;
  
    @Column
    lastName: string;

    @Column
    email: string;
  
    @Column
    password: string;
  
    @Column
    phone?: string;
  
    @Column
    role: UserRole

}