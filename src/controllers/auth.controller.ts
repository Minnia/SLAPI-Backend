import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}
