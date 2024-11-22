import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsInt, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        example: '',
    })
    @IsString()
    @Length(1,50)
    name:string;

    @ApiProperty({
        example: '',
    })
    @IsArray()
    @IsString({each: true })
    image: string[];

    @ApiProperty({
        example: '',
    })
    @IsString()
    @Length(1, 200)
    description:string;

    @ApiProperty({
        example: '',
    })
    @IsDecimal({ decimal_digits: '2' })
    @IsPositive()
    price: number;

    @IsDecimal({decimal_digits:'2'})
    @IsPositive()
    @IsOptional()
    discount?: number;

    @ApiProperty({
        example: '',
    })
    @IsInt()
    @IsPositive()
    stock:number

    @ApiProperty({
        example: '',
    })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    categoryName?: string;
}
