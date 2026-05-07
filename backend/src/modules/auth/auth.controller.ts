import { Body, Controller, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token-guard';
import { JwtPayload } from 'src/common/strategy/acces-token-strategy';
import { GetUserFromToken } from 'src/common/decorators/get-users-from-token-decorators';
import { RefreshTokenPayload } from 'src/common/strategy/refresh-token-strategy';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token-guards';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipThrottle()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @SkipThrottle()
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @SkipThrottle()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  refreshToken(@GetUserFromToken() user: RefreshTokenPayload) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @SkipThrottle()
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetUserFromToken() user: JwtPayload) {
    return this.authService.logout(user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('change-password')
  changePassword(
    @GetUserFromToken() user: JwtPayload,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      user.id,
      changePasswordDto.oldPassword,

      changePasswordDto.newPassword,
    );
  }
  @Throttle({})
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    console.log('Received body:', resetPasswordDto);
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }
}
