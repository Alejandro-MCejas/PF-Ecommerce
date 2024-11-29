import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"


export interface ProductIdAndQuantity {
    id: string
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

}
