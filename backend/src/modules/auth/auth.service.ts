import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/users.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { hashData } from 'src/common/utils/hash-data.utils';

import * as bcrypt from 'bcryptjs';

import { LoginDto } from './dto/login.dto';
import { nanoid } from 'nanoid';
import { MailService } from 'src/common/services/mail.service';
import {
  RESET_TOKEN_EXPIRY_MINUTES,
  RESET_TOKEN_LENGTH,
} from './consts/auth-security';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ firstName: string; email: string }> {
    const isUserExists = await this.usersService.getUserByEmail(
      createUserDto.email,
    );
    if (isUserExists) throw new BadRequestException('Email occupied');

    const hashedPassword = await hashData(createUserDto.password);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      firstName: newUser.firstName,
      email: newUser.email,
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found...');
    }

    if (!oldPassword) {
      throw new UnauthorizedException(
        'Old password or user password is missing...',
      );
    }

    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect password...');
    }

    const hashedPassword = await hashData(newPassword);
    user.password = hashedPassword;
    await this.usersService.update(userId, user);

    return {
      message: 'Password has been changed successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokens = await this.getTokens(user._id);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return {
        message:
          'If an account with that email exists, password reset instructions have been sent.',
      };
    }

    const expiryDate = new Date(
      Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000,
    );

    const resetToken = nanoid(RESET_TOKEN_LENGTH);

    await this.usersService.update(user._id, {
      resetToken,
      resetTokenExpiry: expiryDate,
    });

    await this.mailService.nodeSendEmail(email, resetToken);

    return {
      message:
        'If an account with that email exists, password reset instructions have been sent.',
    };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const user = await this.usersService.getUserByResetToken(resetToken);
    if (!user || !user.resetTokenExpiry) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const now = new Date();
    if (now > user.resetTokenExpiry) {
      throw new BadRequestException('Reset token has expired');
    }

    const hashedPassword = await hashData(newPassword);

    await this.usersService.update(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return {
      message: `Password reset successfully`,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const tokens = await this.getTokens(user._id);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return true;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private async getTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          { id: userId },
          {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_LIFETIME'),
          },
        ),
        this.jwtService.signAsync(
          { id: userId },
          {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_LIFETIME'),
          },
        ),
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Token generation failed');
    }
  }
}
