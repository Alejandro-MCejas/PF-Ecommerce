import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { mercadoPago } from 'src/entities/mercadoPago.entity';
import { OrderDetailRepository } from 'src/order-detail/order-detail.repository';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(private readonly configService: ConfigService, 
    @InjectRepository(mercadoPago) private readonly mercadoPagoRepository:Repository<mercadoPago>,
    private readonly orderRepository:OrderDetailRepository,
    private readonly ordersService: OrdersService, 
  ) {


    const accessToken = this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Access token de MercadoPago no configurado.');
    }

    this.client = new MercadoPagoConfig({ accessToken });
  }

  async createPago(preferenceData: any, orderId: string): Promise<any> {
    try {

      const orderResponse = await this.ordersService.findOneOrderService(orderId);
      // Crear una instancia de Preference
      const preference = new Preference(this.client);
      const response = await preference.create({
        body: {
          items: preferenceData.items, // Items enviados por el cliente
          back_urls: preferenceData.back_urls || {}, // URLs opcionales
          auto_return: preferenceData.auto_return || 'approved', // Opcional
        },
      });
      console.log(response);
      const totalAmount = orderResponse.orderDetail.reduce((total, product) => total + product.price, 0);

      const order = await this.orderRepository.findOneOrderDetailRepository(orderId);

      if(!order){
        throw new Error('Order not found');
      }

      console.log(response);
      const mercadoPago = this.mercadoPagoRepository.create({
        // pagoStatus: response.status,
        pagoId: response.id,
        totalAmount,
        externalReference: orderId,  // Referencia externa, en este caso el ID de la orden
        order: orderResponse.order,
      });

      await this.mercadoPagoRepository.save(mercadoPago); 

      return response;
    } catch (error) {
      console.error(`Error al crear el pago: ${error.message}`);
      throw new Error(`Error en MercadoPago: ${error.message}`);
    }
  }
}

