import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RESET_TOKEN_LENGTH } from '../consts/auth-security';
import { ResetPasswordDto } from './reset-password.dto';

describe('ResetPasswordDto', () => {
  it('rejects tokens with invalid length', async () => {
    const resetPasswordDto = plainToInstance(ResetPasswordDto, {
      token: 'too-short',
      newPassword: 'password123',
    });

    const errors = await validate(resetPasswordDto);

    expect(errors.some((error) => error.property === 'token')).toBe(true);
  });

  it('rejects passwords above the supported maximum', async () => {
    const resetPasswordDto = plainToInstance(ResetPasswordDto, {
      token: 'a'.repeat(RESET_TOKEN_LENGTH),
      newPassword: 'a'.repeat(33),
    });

    const errors = await validate(resetPasswordDto);

    expect(errors.some((error) => error.property === 'newPassword')).toBe(true);
  });
});
