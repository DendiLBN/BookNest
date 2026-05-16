import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MAX_BOOK_RATING,
  MAX_BOOK_TEXT_LENGTH,
  MIN_BOOK_RATING,
  MIN_BOOK_TEXT_LENGTH,
} from '../consts/book-limits';

@Schema()
export class Book {
  @Prop({
    type: String,
    required: true,
    minlength: MIN_BOOK_TEXT_LENGTH,
    maxlength: MAX_BOOK_TEXT_LENGTH,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    minlength: MIN_BOOK_TEXT_LENGTH,
    maxlength: MAX_BOOK_TEXT_LENGTH,
  })
  author: string;

  @Prop({
    type: Number,
    required: true,
    min: MIN_BOOK_RATING,
    max: MAX_BOOK_RATING,
  })
  rate: number;

  @Prop({ type: [String], default: [] })
  category: string[];

  @Prop({ type: String, default: '' })
  coverImageUrl?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDocument = Book & Document & { _id: string };
