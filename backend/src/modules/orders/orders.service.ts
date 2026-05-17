import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from '../books/books.service';
import { UsersService } from '../user/users.service';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async createFromCart(userId: string): Promise<OrderDocument> {
    const user = await this.usersService.findOne(userId);
    const cartItems = user?.cartItems ?? [];

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const books = await this.booksService.findManyByIds(
      cartItems.map((item) => item.bookId),
    );
    const booksById = new Map(books.map((book) => [book._id.toString(), book]));

    const items = cartItems.map((cartItem) => {
      const book = booksById.get(cartItem.bookId);

      if (!book) {
        throw new BadRequestException('Cart contains unavailable books');
      }

      return {
        bookId: cartItem.bookId,
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
        quantity: cartItem.quantity,
        unitPriceCents: book.priceCents,
        lineTotalCents: book.priceCents * cartItem.quantity,
      };
    });

    const totalPriceCents = items.reduce(
      (total, item) => total + item.lineTotalCents,
      0,
    );
    const order = await this.orderModel.create({
      userId,
      items,
      totalPriceCents,
    });

    await this.usersService.update(userId, { cartItems: [] });

    return order;
  }

  async findMine(userId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
