import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
  @Prop({ type: String, required: true, minlength: 1, maxlength: 255 })
  title: string;

  @Prop({ type: String, required: true, minlength: 1, maxlength: 255 })
  author: string;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rate: number;

  @Prop({ type: [String], default: [] })
  category: string[];

  @Prop({ type: String, default: '' })
  coverImageUrl?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDocument = Book & Document & { _id: string };
