import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { AccessTokenGuard } from '../../common/guards/access-token-guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @SkipThrottle()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @SkipThrottle()
  @Get()
  findAll(@Query() searchBookDto: SearchBookDto) {
    return this.booksService.findAll(searchBookDto);
  }

  @Get('dashboard/summary')
  getDashboardSummary() {
    return this.booksService.getDashboardSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateOne(id, updateBookDto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete('')
  deleteMultipleBooks(@Body() body: { ids: string[] }) {
    return this.booksService.removeMultiple(body.ids);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
