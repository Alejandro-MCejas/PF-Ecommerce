import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    address: string

    @IsString()
    phone: string

}




