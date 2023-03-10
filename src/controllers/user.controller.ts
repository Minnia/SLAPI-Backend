import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from 'src/dtos/CreateUserDto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }
  @Get('all-users')
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get('user')
  getUser(@Query('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Delete('user-by-id')
  deleteUser(@Query('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
