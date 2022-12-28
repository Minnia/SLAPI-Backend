import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;

  id: string | number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
