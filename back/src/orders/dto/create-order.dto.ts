import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"


export interface ProductId {
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
            { 'id': '' },
        ]
    })
    @IsArray()
    @ArrayNotEmpty()
    products: Array<ProductId>



}
