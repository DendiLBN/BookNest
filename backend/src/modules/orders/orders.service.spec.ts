import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  const orderModel = {
    create: jest.fn(),
    find: jest.fn(),
  };
  const booksService = {
    findManyByIds: jest.fn(),
  };
  const usersService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  let service: OrdersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrdersService(
      orderModel as never,
      booksService as never,
      usersService as never,
    );
  });

  it('rejects checkout when the cart is empty', async () => {
    usersService.findOne.mockResolvedValue({ cartItems: [] });

    await expect(service.createFromCart('user-1')).rejects.toThrow(
      new BadRequestException('Cart is empty'),
    );
  });

  it('creates an order from cart items and clears the cart', async () => {
    usersService.findOne.mockResolvedValue({
      cartItems: [{ bookId: 'book-1', quantity: 2 }],
    });
    booksService.findManyByIds.mockResolvedValue([
      {
        _id: { toString: () => 'book-1' },
        title: 'Pan Tadeusz',
        author: 'Adam Mickiewicz',
        coverImageUrl: '/cover.png',
        priceCents: 2999,
      },
    ]);
    orderModel.create.mockResolvedValue({
      _id: 'order-1',
    });

    await service.createFromCart('user-1');

    expect(orderModel.create).toHaveBeenCalledWith({
      userId: 'user-1',
      items: [
        {
          bookId: 'book-1',
          title: 'Pan Tadeusz',
          author: 'Adam Mickiewicz',
          coverImageUrl: '/cover.png',
          quantity: 2,
          unitPriceCents: 2999,
          lineTotalCents: 5998,
        },
      ],
      totalPriceCents: 5998,
    });
    expect(usersService.update).toHaveBeenCalledWith('user-1', {
      cartItems: [],
    });
  });
});
