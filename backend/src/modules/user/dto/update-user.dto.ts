import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteBookIds?: string[];

  @IsOptional()
  @IsArray()
  cartItems?: {
    bookId: string;
    quantity: number;
  }[];
}
