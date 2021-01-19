import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from './../../common/decorators/auth-user.decorator';
import { Controller, Post, UsePipes, ValidationPipe, Delete, Put, Param, Body, ParseIntPipe, Get, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getUsers(): Promise<UserDto[]>{
        return this.userService.getUsers();
    }

    @Get("/:id")
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return this.userService.getUserById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<UserDto> {
        return this.userService.createUser(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number
               ): Promise<any> {
        return this.userService.deleteUser(id);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        return this.userService.updateUser(id, updateUserDto);
    }
}
