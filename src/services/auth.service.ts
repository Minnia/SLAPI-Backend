import { Body, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(auth: AuthDto) {
    const hash = await argon.hash(auth.password);
    try {
      const user = await this.userService.create({
        firstName: auth.firstName,
        lastName: auth.lastName,
        age: auth.age,
        id: auth.id,
        password: hash,
      });
      return this.signup(user);
    } catch (error) {
      throw error;
    }
  }
  //check if user exists
  //sign in if user exists
  //if user does not exist, throw error
  async signin(@Body() auth: AuthDto) {
    const { id } = auth;
    try {
      // const user = this.userService.getUserById(id);
      const user = await this.userService.getUserById(id);
      if (!user) throw new ForbiddenException('Credentials incorrect');
      const pwMatches = argon.verify(user.password, auth.password);
      if (!pwMatches) throw new ForbiddenException('Password does not match');

      return this.signToken(user.id, user.lastName);
    } catch (error) {
      throw error;
    }
  }

  // We have to authenticate the user by verifying their credentials
  async signToken(
    userId: string | number,
    lastName: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      name: lastName,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
