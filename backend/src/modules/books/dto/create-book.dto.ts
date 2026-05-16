import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  MAX_BOOK_RATING,
  MAX_BOOK_TEXT_LENGTH,
  MIN_BOOK_RATING,
  MIN_BOOK_TEXT_LENGTH,
} from '../consts/book-limits';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_BOOK_TEXT_LENGTH)
  @MaxLength(MAX_BOOK_TEXT_LENGTH)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_BOOK_TEXT_LENGTH)
  @MaxLength(MAX_BOOK_TEXT_LENGTH)
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Min(MIN_BOOK_RATING)
  @Max(MAX_BOOK_RATING)
  rate: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  coverImageUrl?: string;
}
