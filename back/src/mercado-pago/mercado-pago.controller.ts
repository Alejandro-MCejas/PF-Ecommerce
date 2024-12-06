import { Controller, Post, Body, Param, Get, Query, } from '@nestjs/common';
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
    const response = await this.mercadoPagoService.createPagoWithOrderDetail(preferenceData, orderDetailId);
    return response;
  }

  @Get('feedback')
  async handleFeedback(
    @Query('payment_id') payment_id: string,
    @Query('status') status: string,
    @Query('merchant_order_id') merchant_order_id: string
  ) {
    // Solo imprimir para ver los valores
    console.log('Parámetros:', { payment_id, status, merchant_order_id });
    
    return {
      message: 'feedback successfully received',
      data: { payment_id, status, merchant_order_id },
    };
  }

}