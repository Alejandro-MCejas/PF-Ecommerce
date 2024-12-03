import { IsString } from "class-validator"

export class structureOfForgotPasswordDto {

    @IsString()
    token: string

    @IsString()
    newPassword: string

    @IsString()
    confirmPassword: string
}