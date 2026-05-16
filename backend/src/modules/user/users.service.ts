import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from '../../common/enums/user-role.enum';
import { User, UsersDocument } from './schema/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async getUserByResetToken(resetToken: string): Promise<UsersDocument | null> {
    return this.userModel.findOne({ resetToken }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersDocument> {
    return this.userModel.create(createUserDto);
  }

  async getUserById(userId: string): Promise<UsersDocument | null> {
    const user = await this.userModel
      .findById(userId)
      .select('+password')
      .lean()
      .exec();

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    return this.withUserDefaults(user as UsersDocument);
  }

  async getUserByEmail(email: string): Promise<UsersDocument | null> {
    const user = await this.userModel.findOne({ email }).lean().exec();
    return user ? this.withUserDefaults(user as UsersDocument) : null;
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument | null> {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async updateAvatar(
    userId: string,
    avatarUrl: string,
  ): Promise<UsersDocument | null> {
    return this.update(userId, { avatarUrl });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UsersDocument | null> {
    try {
      return await this.update(userId, {
        ...updateProfileDto,
        email: updateProfileDto.email.toLowerCase(),
      });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 11000) {
        throw new ConflictException('Email is already in use');
      }

      throw error;
    }
  }

  async addFavoriteBook(
    userId: string,
    bookId: string,
  ): Promise<UsersDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteBookIds: bookId } },
        { new: true },
      )
      .exec();
  }

  async removeFavoriteBook(
    userId: string,
    bookId: string,
  ): Promise<UsersDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { favoriteBookIds: bookId } },
        { new: true },
      )
      .exec();
  }

  async updateCartItem(
    userId: string,
    bookId: string,
    quantity: number,
  ): Promise<UsersDocument | null> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const existingCartItem = user.cartItems.find(
      (item) => item.bookId === bookId,
    );
    const cartItems = existingCartItem
      ? user.cartItems.map((item) =>
          item.bookId === bookId ? { bookId, quantity } : item,
        )
      : [...user.cartItems, { bookId, quantity }];

    return this.update(userId, { cartItems });
  }

  async removeCartItem(
    userId: string,
    bookId: string,
  ): Promise<UsersDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { cartItems: { bookId } } },
        { new: true },
      )
      .exec();
  }

  async findOne(userId: string): Promise<UsersDocument | null> {
    const user = await this.userModel.findById(userId).exec();

    return user ? this.withUserDefaults(user as UsersDocument) : null;
  }

  async remove(userId: string): Promise<UsersDocument | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  private withUserDefaults(user: UsersDocument): UsersDocument {
    user.favoriteBookIds ??= [];
    user.cartItems ??= [];
    user.role ??= UserRole.Customer;

    return user;
  }
}
