import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}