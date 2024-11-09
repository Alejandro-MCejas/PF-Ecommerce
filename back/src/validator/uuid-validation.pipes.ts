import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!isUUID(value)) {
            throw new BadRequestException('Formato invalido de UUID');
        }
        return value;
    }
}