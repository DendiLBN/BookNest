import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

const MIN_PAGE_NUMBER = 1;
const MIN_ITEMS_PER_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 100;

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  @Min(MIN_PAGE_NUMBER)
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Min(MIN_ITEMS_PER_PAGE)
  @Max(MAX_ITEMS_PER_PAGE)
  perPage: number;
}
