import { Controller, Post, Body, Param } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create-pago/:orderId')
  async createPayment(@Param('orderId') orderId: string, @Body() preferenceData : any) {
    const paymentResponse = await this.mercadoPagoService.createPago(preferenceData, orderId);
      
      // Retornamos la respuesta de MercadoPago
      return {
        message: 'Payment created successfully',
        data: paymentResponse,
      };
  }
}  
