import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
    IsIn,
    IsEmail
  } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {

  @IsDefined()  
  @IsString()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST])
  role: UserRole;
}