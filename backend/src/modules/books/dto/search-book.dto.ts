import { IsArray, IsOptional, IsString, ValidateIf } from 'class-validator';
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
}
