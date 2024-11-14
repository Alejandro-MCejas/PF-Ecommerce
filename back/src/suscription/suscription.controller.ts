import { Controller, Get,Param } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { Products } from 'src/entities/products.entity';

@Controller('products')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Get('suscription/:userId')
  async suscription(@Param('userId') userId:string): Promise<Products[]>{
    return await this.suscriptionService.getSuscription(userId)
  }
}
