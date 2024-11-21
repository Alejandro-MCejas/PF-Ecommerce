import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Suscription } from "src/entities/suscription.entity";

export class CreateSuscriptionDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;
}

export interface CreateSuscriptionResponse {
    suscription: Suscription; // Este es el objeto de la suscripción que creas y guardas.
    init_point: string; // Este es el 'init_point' generado por MercadoPago.
}
