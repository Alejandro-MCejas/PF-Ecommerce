import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export enum OrderStatus {
  PAYMENT_PENDING = "Pago pendiente",
  PAYMENT_CONFIRMED = "Pago confirmado, preparacion del envio",
  SHIPPED = "Enviado",
  RECEIVED = "Recibido",
}

export interface ProductIdAndQuantity {
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "The user ID placing the order",
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: [
      { id: "product-id-1", quantity: 2 },
      { id: "product-id-2", quantity: 1 },
    ],
    description: "List of products with their quantities",
  })
  @IsArray()
  @ArrayNotEmpty()
  products: Array<ProductIdAndQuantity>;

  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.PAYMENT_PENDING,
    description: "The current status of the order",
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus = OrderStatus.PAYMENT_PENDING; // Default to "Pago pendiente"
}