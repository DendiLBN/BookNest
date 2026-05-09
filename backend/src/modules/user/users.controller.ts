import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../../common/guards/access-token-guard';
import { JwtPayload } from 'src/common/strategy/acces-token-strategy';
import { GetUserFromToken } from 'src/common/decorators/get-users-from-token-decorators';
import { SkipThrottle } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';

const avatarUploadPath = join(process.cwd(), 'uploads', 'avatars');

@SkipThrottle()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@GetUserFromToken() user: JwtPayload) {
    return this.usersService.getUserById(user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          mkdirSync(avatarUploadPath, { recursive: true });
          callback(null, avatarUploadPath);
        },
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(
          file.mimetype,
        );

        if (!isImage) {
          callback(
            new BadRequestException('Avatar must be a JPG, PNG, or WEBP image'),
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
  updateAvatar(
    @GetUserFromToken() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }

    return this.usersService.updateAvatar(
      user.id,
      `/uploads/avatars/${file.filename}`,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me/favorites/:bookId')
  addFavoriteBook(
    @GetUserFromToken() user: JwtPayload,
    @Param('bookId') bookId: string,
  ) {
    return this.usersService.addFavoriteBook(user.id, bookId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me/favorites/:bookId')
  removeFavoriteBook(
    @GetUserFromToken() user: JwtPayload,
    @Param('bookId') bookId: string,
  ) {
    return this.usersService.removeFavoriteBook(user.id, bookId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me')
  deleteMe(@GetUserFromToken() user: JwtPayload) {
    return this.usersService.remove(user.id);
  }
}
