import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'Juan Peréz',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'juan_perez22@gmail.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        example: 'Juan222@',
    })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({
        example: 'Córdoba 555',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        example: '9786453522',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    isSuscription?: boolean; // Agregada propiedad para manejar la suscripción
}

