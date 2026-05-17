import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class SearchBookDto extends PaginationDto {
  @IsOptional()
  @ValidateIf((o) => o.searchString)
  @IsString()
  searchString?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  minPriceCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100000)
  maxPriceCents?: number;

  @IsOptional()
  @IsString()
  sortBy?: 'priceAsc' | 'priceDesc';
}
