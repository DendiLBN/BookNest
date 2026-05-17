import {
  BadRequestException,
  Body,
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
import { mkdirSync, unlinkSync } from 'fs';
import { randomUUID } from 'crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_MIME_TYPES,
  IMAGE_EXTENSION_BY_MIME_TYPE,
} from '../../common/consts/image-upload';
import { MAX_IMAGE_UPLOAD_SIZE_BYTES } from '../../common/consts/upload-limits';
import { isValidImageFileSignature } from '../../common/utils/is-valid-image-file';

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
  @Patch('me/profile')
  updateProfile(
    @GetUserFromToken() user: JwtPayload,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(user.id, updateProfileDto);
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
          callback(
            null,
            `${randomUUID()}${IMAGE_EXTENSION_BY_MIME_TYPE[file.mimetype]}`,
          );
        },
      }),
      fileFilter: (_req, file, callback) => {
        const fileExtension = extname(file.originalname).toLowerCase();
        const isImage =
          ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype) &&
          ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension);

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
        fileSize: MAX_IMAGE_UPLOAD_SIZE_BYTES,
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

    if (!isValidImageFileSignature(file.path, file.mimetype)) {
      unlinkSync(file.path);
      throw new BadRequestException(
        'Avatar file content is not a supported image',
      );
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
  @Patch('me/cart/:bookId')
  updateCartItem(
    @GetUserFromToken() user: JwtPayload,
    @Param('bookId') bookId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.usersService.updateCartItem(
      user.id,
      bookId,
      updateCartItemDto.quantity,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me/cart/:bookId')
  removeCartItem(
    @GetUserFromToken() user: JwtPayload,
    @Param('bookId') bookId: string,
  ) {
    return this.usersService.removeCartItem(user.id, bookId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me')
  deleteMe(@GetUserFromToken() user: JwtPayload) {
    return this.usersService.remove(user.id);
  }
}
