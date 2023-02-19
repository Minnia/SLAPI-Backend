import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;

  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
