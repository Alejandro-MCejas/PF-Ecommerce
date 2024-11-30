import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsDecimal, IsInt, IsOptional, IsPositive, IsString, Length } from "class-validator";

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
    image?: string[];

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

    @IsOptional()
    @IsDate()
    discountStartDate?: Date;

    @IsOptional()
    @IsDate()
    discountEndDate?: Date;   

    @ApiProperty({
        example: '',
    })
    @IsInt()
    @IsPositive()
    stock:number

    @ApiProperty({
        example: '',
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categoriess?: string[];
}
