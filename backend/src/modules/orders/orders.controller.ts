import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUserFromToken } from '../../common/decorators/get-users-from-token-decorators';
import { AccessTokenGuard } from '../../common/guards/access-token-guard';
import { JwtPayload } from '../../common/strategy/acces-token-strategy';
import { OrdersService } from './orders.service';

@UseGuards(AccessTokenGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@GetUserFromToken() user: JwtPayload) {
    return this.ordersService.createFromCart(user.id);
  }

  @Get('me')
  findMine(@GetUserFromToken() user: JwtPayload) {
    return this.ordersService.findMine(user.id);
  }
}
