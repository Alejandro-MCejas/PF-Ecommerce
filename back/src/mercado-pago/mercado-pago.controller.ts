import { Controller, Post, Body, Param } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { ProductsService } from 'src/products/products.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService,
    private readonly productsService:ProductsService,
  ) {}

  @Post('create-pago/:orderDetailId')
  async createPagoWithOrderDetail(
    @Param('orderDetailId') orderDetailId: string,
    @Body() preferenceData: any,
  ) {
    return await this.mercadoPagoService.createPagoWithOrderDetail(preferenceData, orderDetailId);
  }

}  
