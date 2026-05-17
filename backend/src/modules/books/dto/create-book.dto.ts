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
  MAX_BOOK_PRICE_CENTS,
  MAX_BOOK_RATING,
  MAX_BOOK_TEXT_LENGTH,
  MIN_BOOK_PRICE_CENTS,
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

  @IsNotEmpty()
  @IsInt()
  @Min(MIN_BOOK_PRICE_CENTS)
  @Max(MAX_BOOK_PRICE_CENTS)
  priceCents: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  coverImageUrl?: string;
}
