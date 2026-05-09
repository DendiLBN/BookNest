import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @SkipThrottle()
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @SkipThrottle()
  @Get()
  findAll(@Query() searchBookDto: SearchBookDto) {
    return this.booksService.findAll(searchBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateOne(id, updateBookDto);
  }

  @Delete('')
  deleteMultipleBooks(@Body() body: { ids: string[] }) {
    return this.booksService.removeMultiple(body.ids);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
