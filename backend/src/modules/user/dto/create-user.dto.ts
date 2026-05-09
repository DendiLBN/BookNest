import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  lastName: string;
}
