import { IsEnum } from 'class-validator';
import { OrderStatus } from '../consts/order-status';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
