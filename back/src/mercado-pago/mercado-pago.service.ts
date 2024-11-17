import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { mercadoPago } from 'src/entities/mercadoPago.entity';
import { Products } from 'src/entities/products.entity';
import { OrderDetailRepository } from 'src/order-detail/order-detail.repository';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(private readonly configService: ConfigService, 
    @InjectRepository(mercadoPago) private readonly mercadoPagoRepository:Repository<mercadoPago>,
    private readonly orderRepository:OrderDetailRepository,
    private readonly ordersService: OrdersService, 
    private readonly productsService: ProductsService,
  ) {
    const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Access token de MercadoPago no configurado.');
    }

    this.client = new MercadoPagoConfig({ accessToken });
  
  }

  async createPago(preferenceData: any, orderId: string): Promise<any> {
    try {

      const orderResponse = await this.ordersService.findOneOrderService(orderId);


      const products = await Promise.all(orderResponse.orderDetail.map(async (product: Products) => {
        return {
          id: product.id,
          title: product.name,            // Título del producto
          quantity: 1,                     // Asumimos que es 1, pero podrías ajustar esto según la cantidad
          unit_price: parseFloat(product.price.toString()),  // Precio unitario del producto
        };
      }));
  
      const preference = new Preference(this.client);
      const response = await preference.create({
        body: {
          
          items: products,
          back_urls: preferenceData.back_urls || {
            success: 'http://localhost:8080/api/feedback',
            failure: 'http://localhost:8080/api/feedback',
            pending: 'http://localhost:8080/api/feedback'},
          auto_return: preferenceData.auto_return || 'approved',
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
        pagoId: response.id,
        totalAmount,
        externalReference: orderId,
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

