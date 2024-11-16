import { Body, Controller, Post} from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  // @Post('create-payment')
  // async createPayment() {
  //   return this.mercadoPagoService.createPago({
  //     items: [
  //       {
  //         title: 'My product',
  //         quantity: 1,
  //         unit_price: 2000,
  //       },
  //     ],
  //     back_urls: {
  //       success: 'https://www.tuwebsite.com/success',
  //       failure: 'https://www.tuwebsite.com/failure',
  //       pending: 'https://www.tuwebsite.com/pending',
  //     },
  //     auto_return: 'approved',
  //   });
  // }
  @Post('create-pago')
  async createPayment(@Body() paymentData: { preferenceData: any, orderId: string }) {
    const { preferenceData, orderId } = paymentData;

    // Llamar al servicio de MercadoPago para crear el pago
    return await this.mercadoPagoService.createPago(preferenceData, orderId);
  
  }
}  