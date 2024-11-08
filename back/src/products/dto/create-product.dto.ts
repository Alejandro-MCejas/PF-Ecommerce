import { IsArray, IsDecimal, IsInt, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateProductDto {
    @IsString()
    @Length(1,50)
    name:string;

    @IsArray()
    @IsString({each: true })
    image: string[];

    @IsString()
    @Length(1, 200)
    description:string;

    @IsDecimal({ decimal_digits: '2' })
    @IsPositive()
    price: number;

    @IsInt()
    @IsPositive()
    stock:number

    @IsString()
    @IsOptional()
    @Length(1, 50)
    categoryName?: string;
}
