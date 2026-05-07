import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ValidateIf((o) => !!o.refreshToken)
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @ValidateIf((o) => !!o.resetToken)
  @IsString()
  resetToken?: string;

  @IsOptional()
  @IsDate()
  resetTokenExpiry?: Date;
}
