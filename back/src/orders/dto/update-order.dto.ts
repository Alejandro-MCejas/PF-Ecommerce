import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto, ProductIdAndQuantity } from './create-order.dto';
import { ArrayNotEmpty, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @ApiProperty({
        example: [
            { 'id': '' }
        ]
    })
    @IsUUID()
    @IsOptional()
    userId?: string;

    @ApiProperty({
        example: [
            { 'id': '', 'quantity': '' }
        ]
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    products?: ProductIdAndQuantity[];


}
