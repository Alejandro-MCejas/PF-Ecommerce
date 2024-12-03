import { IsString } from "class-validator"


export class ClaimDto{

    @IsString()
    userId: string

    @IsString()
    productId: string
}