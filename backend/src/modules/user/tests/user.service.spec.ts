import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users.service';
import { User } from '../schema/user.schema';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  const findByIdAndUpdate = jest.fn();

  beforeEach(async () => {
    findByIdAndUpdate.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: { findByIdAndUpdate },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('normalizes the profile email before updating the user', async () => {
    const exec = jest.fn().mockResolvedValue({ _id: 'user-1' });
    findByIdAndUpdate.mockReturnValue({ exec });

    await service.updateProfile('user-1', {
      email: 'Reader@BookNest.dev',
      firstName: 'Reader',
      lastName: 'Booker',
    });

    expect(findByIdAndUpdate).toHaveBeenCalledWith(
      'user-1',
      {
        email: 'reader@booknest.dev',
        firstName: 'Reader',
        lastName: 'Booker',
      },
      { new: true },
    );
  });

  it('returns a conflict when the requested email already exists', async () => {
    findByIdAndUpdate.mockReturnValue({
      exec: jest
        .fn()
        .mockRejectedValue(
          Object.assign(new Error('duplicate'), { code: 11000 }),
        ),
    });

    await expect(
      service.updateProfile('user-1', {
        email: 'reader@booknest.dev',
        firstName: 'Reader',
        lastName: 'Booker',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
