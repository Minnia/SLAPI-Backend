import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/auth.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserModule } from './user.module';

@Module({
  imports: [JwtModule, UserModule, ConfigModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtService, ConfigService],
})
export class AuthModule {}
