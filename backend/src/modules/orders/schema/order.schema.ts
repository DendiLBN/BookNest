import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../consts/order-status';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({
    type: [
      {
        bookId: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        coverImageUrl: { type: String, default: '' },
        quantity: { type: Number, required: true },
        unitPriceCents: { type: Number, required: true },
        lineTotalCents: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: {
    bookId: string;
    title: string;
    author: string;
    coverImageUrl?: string;
    quantity: number;
    unitPriceCents: number;
    lineTotalCents: number;
  }[];

  @Prop({ type: Number, required: true })
  totalPriceCents: number;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document & { _id: string };
