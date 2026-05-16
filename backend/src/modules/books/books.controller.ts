import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  BadRequestException,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { mkdirSync, readFileSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const bookCoverUploadPath = join(process.cwd(), 'uploads', 'book-covers');
const allowedBookCoverMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const allowedBookCoverExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const bookCoverExtensionByMimeType: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const isValidBookCoverSignature = (
  filePath: string,
  mimetype: string,
): boolean => {
  const fileHeader = readFileSync(filePath).subarray(0, 12);

  if (mimetype === 'image/jpeg') {
    return (
      fileHeader[0] === 0xff && fileHeader[1] === 0xd8 && fileHeader[2] === 0xff
    );
  }

  if (mimetype === 'image/png') {
    return fileHeader
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (mimetype === 'image/webp') {
    return (
      fileHeader.subarray(0, 4).toString() === 'RIFF' &&
      fileHeader.subarray(8, 12).toString() === 'WEBP'
    );
  }

  return false;
};

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
  @Patch(':id/cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          mkdirSync(bookCoverUploadPath, { recursive: true });
          callback(null, bookCoverUploadPath);
        },
        filename: (_req, file, callback) => {
          callback(
            null,
            `${randomUUID()}${bookCoverExtensionByMimeType[file.mimetype]}`,
          );
        },
      }),
      fileFilter: (_req, file, callback) => {
        const fileExtension = extname(file.originalname).toLowerCase();
        const isImage =
          allowedBookCoverMimeTypes.includes(file.mimetype) &&
          allowedBookCoverExtensions.includes(fileExtension);

        if (!isImage) {
          callback(
            new BadRequestException(
              'Book cover must be a JPG, PNG, or WEBP image',
            ),
            false,
          );
          return;
        }

        callback(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  updateCover(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Book cover file is required');
    }

    if (!isValidBookCoverSignature(file.path, file.mimetype)) {
      unlinkSync(file.path);
      throw new BadRequestException(
        'Book cover file content is not a supported image',
      );
    }

    return this.booksService.updateOne(id, {
      coverImageUrl: `/uploads/book-covers/${file.filename}`,
    });
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
