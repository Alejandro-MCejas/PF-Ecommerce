import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDecimal, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateProductDto {

    @ApiProperty({
        example: ''
    })
    @IsString()
    @Length(1, 50)
    @IsOptional()
    name?: string;

    @ApiProperty({
        example: ''
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    image?: string[];

    @ApiProperty({
        example: ''
    })
    @IsString()
    @Length(1, 200)
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: ''
    })
    @IsDecimal({ decimal_digits: '2' })
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsOptional()
    @IsBoolean()
    suscription?: boolean;

    @IsDecimal({decimal_digits:'2'})
    @IsPositive()
    @IsOptional()
    discount?: number;

    @ApiProperty({
        example: ''
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: ''
    })
    @IsString()
    @Length(1, 50)
    @IsOptional()
    categoryName?: string;
}

