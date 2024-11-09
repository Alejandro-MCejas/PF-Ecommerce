import { IsArray, IsDecimal, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @Length(1, 50)
    @IsOptional()
    name?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    image?: string[];

    @IsString()
    @Length(1, 200)
    @IsOptional()
    description?: string;

    @IsDecimal({ decimal_digits: '2' })
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    categoryName?: string;
}

