import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class LoginUserDto {

    @ApiProperty({
        type: 'string',
        example: 'user1@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({
        type: 'string',
        example: 'prueba'
    })
    @IsNotEmpty()
    @IsString()
    password: string
}