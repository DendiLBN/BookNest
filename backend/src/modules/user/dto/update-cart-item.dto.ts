import { IsInt, Max, Min } from 'class-validator';
import {
  MAX_CART_ITEM_QUANTITY,
  MIN_CART_ITEM_QUANTITY,
} from '../consts/user-limits';

export class UpdateCartItemDto {
  @IsInt()
  @Min(MIN_CART_ITEM_QUANTITY)
  @Max(MAX_CART_ITEM_QUANTITY)
  quantity: number;
}
