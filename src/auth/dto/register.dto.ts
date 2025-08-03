import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString({ message: 'Please enter your name' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Please enter a valid password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Please enter your phone number' })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  phone: string;
}
