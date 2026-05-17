import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('rejects page values below one', async () => {
    const paginationDto = plainToInstance(PaginationDto, {
      page: 0,
      perPage: 20,
    });

    const errors = await validate(paginationDto);

    expect(errors.some((error) => error.property === 'page')).toBe(true);
  });

  it('rejects page sizes above the supported maximum', async () => {
    const paginationDto = plainToInstance(PaginationDto, {
      page: 1,
      perPage: 101,
    });

    const errors = await validate(paginationDto);

    expect(errors.some((error) => error.property === 'perPage')).toBe(true);
  });
});
