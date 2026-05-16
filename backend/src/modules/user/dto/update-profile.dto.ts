import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../consts/user-limits';

export class UpdateProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USER_NAME_LENGTH)
  @MaxLength(MAX_USER_NAME_LENGTH)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USER_NAME_LENGTH)
  @MaxLength(MAX_USER_NAME_LENGTH)
  lastName: string;
}
