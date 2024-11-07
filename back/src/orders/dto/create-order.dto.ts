import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"


export interface ProductId{
    id: string
}


export class CreateOrderDto {
    
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @IsArray()
    @ArrayNotEmpty()
    products: Array<ProductId>

    

}
