import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        example: 'Juan Peréz'
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string

    @ApiProperty({
        example: 'juan_perez22@gmail.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'Juan222@'
    })
    @IsString()
    password: string

    @ApiProperty({
        example: 'Juan222@'
    })
    @IsString()
    confirmPassword: string

    @ApiProperty({
        example: 'Córdoba 555'
    })
    @IsString()
    address: string

    @ApiProperty({
        example: '9786453522'
    })
    @IsString()
    phone: string

}




