import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RESET_TOKEN_LENGTH } from '../consts/auth-security';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(RESET_TOKEN_LENGTH, RESET_TOKEN_LENGTH)
  token: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  newPassword: string;
}
