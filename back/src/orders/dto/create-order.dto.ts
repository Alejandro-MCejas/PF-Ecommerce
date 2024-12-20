import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { Orders } from "src/entities/orders.entity";

export interface ProductIdAndQuantity {
    id: string,
    quantity: number
}

export enum OrderStatus {
    PAYMENT_PENDING = "Payment Pending",
    PAYMENT_CONFIRMED = "Payment confirmed, order is being prepared",
    SHIPPED = "Sent",
    RECEIVED = "Received",
}

export interface OrderStatusResponse{
    message: string;
    order: Orders;
}

export class CreateOrderDto {

  @ApiProperty({
      example: ''
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string

  @ApiProperty({
      example: [
          { 'id': '', 'quantity': '' },
      ]
  })
  @IsArray()
  @ArrayNotEmpty()
  products: Array<ProductIdAndQuantity>

  @ApiProperty({
      enum: OrderStatus,
      example: OrderStatus.PAYMENT_PENDING,
      description: "The current status of the order",
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus = OrderStatus.PAYMENT_PENDING; // Default to "Pago pendiente
}
