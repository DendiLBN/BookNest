import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUserFromToken } from '../../common/decorators/get-users-from-token-decorators';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { AccessTokenGuard } from '../../common/guards/access-token-guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtPayload } from '../../common/strategy/acces-token-strategy';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@UseGuards(AccessTokenGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @GetUserFromToken() user: JwtPayload,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createFromCart(user.id, createOrderDto);
  }

  @Get('me')
  findMine(@GetUserFromToken() user: JwtPayload) {
    return this.ordersService.findMine(user.id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
  }
}
