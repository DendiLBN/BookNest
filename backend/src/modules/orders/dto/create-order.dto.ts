import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  street: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  city: string;
}
