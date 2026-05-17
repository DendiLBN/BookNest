import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../../../common/services/mail.service';
import { UsersService } from '../../user/users.service';
import { AuthService } from '../auth.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  const usersService = {
    getUserByEmail: jest.fn(),
    update: jest.fn(),
  };
  const jwtService = {
    signAsync: jest.fn(),
  };
  const configService = {
    get: jest.fn(),
  };
  const mailService = {
    nodeSendEmail: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
        { provide: MailService, useValue: mailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('returns the same login error for unknown email and invalid password', async () => {
    usersService.getUserByEmail.mockResolvedValueOnce(null);

    await expect(
      service.login({
        email: 'reader@booknest.dev',
        password: 'password123',
      }),
    ).rejects.toThrow(new UnauthorizedException('Invalid email or password'));

    usersService.getUserByEmail.mockResolvedValueOnce({
      _id: 'user-1',
      password: 'hashed-password',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(
      service.login({
        email: 'reader@booknest.dev',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(new UnauthorizedException('Invalid email or password'));
  });

  it('returns a neutral forgot-password response for an unknown email', async () => {
    usersService.getUserByEmail.mockResolvedValue(null);

    await expect(
      service.forgotPassword('missing@booknest.dev'),
    ).resolves.toEqual({
      message:
        'If an account with that email exists, password reset instructions have been sent.',
    });
    expect(mailService.nodeSendEmail).not.toHaveBeenCalled();
    expect(usersService.update).not.toHaveBeenCalled();
  });
});
