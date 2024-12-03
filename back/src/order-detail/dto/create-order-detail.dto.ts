import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ProductDetail {
  @ApiProperty({ example: 'uuid-de-producto' })
  @IsNotEmpty()
  productId: string; // Cambiado a `productId` para mayor claridad.

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity: number;
}

export class CreateOrderDetailDto {
  @ApiProperty({ example: 100.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'uuid-de-la-orden', description: 'ID del pedido relacionado' })
  @IsNotEmpty()
  orderId: string; // Cambiado de `order` a `orderId` para simplificar.

  @ApiProperty({ type: [ProductDetail], description: 'Array de productos con cantidad asociada' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetail)
  products: ProductDetail[];
}

