import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../../common/enums/user-role.enum';
import {
  MAX_CART_ITEM_QUANTITY,
  MAX_USER_NAME_LENGTH,
  MIN_CART_ITEM_QUANTITY,
  MIN_USER_NAME_LENGTH,
} from '../consts/user-limits';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({ type: String, default: null })
  refreshToken: string;

  @Prop({
    type: String,
    required: true,
    minlength: MIN_USER_NAME_LENGTH,
    maxlength: MAX_USER_NAME_LENGTH,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    minlength: MIN_USER_NAME_LENGTH,
    maxlength: MAX_USER_NAME_LENGTH,
    trim: true,
  })
  lastName: string;

  @Prop({
    type: String,
    default: null,
  })
  avatarUrl?: string;

  @Prop({
    type: [String],
    default: [],
  })
  favoriteBookIds: string[];

  @Prop({
    type: [
      {
        bookId: { type: String, required: true },
        quantity: {
          type: Number,
          required: true,
          min: MIN_CART_ITEM_QUANTITY,
          max: MAX_CART_ITEM_QUANTITY,
        },
      },
    ],
    default: [],
  })
  cartItems: {
    bookId: string;
    quantity: number;
  }[];

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
  })
  role: UserRole;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UsersDocument = User & Document & { _id: string };
