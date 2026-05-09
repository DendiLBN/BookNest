import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';

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
    return user as UsersDocument;
  }

  async getUserByEmail(email: string): Promise<UsersDocument | null> {
    const user = await this.userModel.findOne({ email }).lean().exec();
    return user as UsersDocument;
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

  async findOne(userId: string): Promise<UsersDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async remove(userId: string): Promise<UsersDocument | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
