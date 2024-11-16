import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSuscriptionDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;
}
