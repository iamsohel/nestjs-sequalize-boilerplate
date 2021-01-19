import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
  } from 'class-validator';
  
  export class RegisterCredentialsDto {
    @IsEmail()
    @IsDefined()  
    @IsString()
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
  }