import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto, ProductId } from './create-order.dto';
import { ArrayNotEmpty, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    products?: ProductId[];


}
