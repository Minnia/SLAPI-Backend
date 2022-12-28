import { Controller, Get, Post, Body } from '@nestjs/common';
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
  @Get('user')
  getUser(): Promise<User> {
    return this.userService.getUser();
  }
}
