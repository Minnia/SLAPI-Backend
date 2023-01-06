import { Body, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}
  async signin(@Body() auth: AuthDto) {
    try {
      const user = this.userService.getUser(auth.id);
      return user;
    } catch (error) {
      throw error;
    }
    //check if user exists
    //sign in if user exists
    //if user does not exist, throw error
  }
}
