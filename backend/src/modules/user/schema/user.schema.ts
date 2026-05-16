import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../../common/enums/user-role.enum';

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
    minlength: 1,
    maxlength: 20,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
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
        quantity: { type: Number, required: true, min: 1, max: 99 },
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
