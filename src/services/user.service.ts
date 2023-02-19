import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/CreateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    //if it does not contain all the information requested, throw error
    try {
      const createdUser = await this.userModel.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          age: dto.age,
          id: dto.id,
          password: dto.password,
        },
      });
      return createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUserById(id: string | number): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
