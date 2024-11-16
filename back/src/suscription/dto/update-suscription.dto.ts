import { PartialType } from '@nestjs/swagger';
import { CreateSuscriptionDto } from './create-suscription.dto';

export class UpdateSuscriptionDto extends PartialType(CreateSuscriptionDto) {}
