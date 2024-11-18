import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { mercadoPago } from 'src/entities/mercadoPago.entity';
// import { Products } from 'src/entities/products.entity';
import { OrderDetailRepository } from 'src/order-detail/order-detail.repository';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(private readonly configService: ConfigService, 
    @InjectRepository(mercadoPago) private readonly mercadoPagoRepository:Repository<mercadoPago>,
    private readonly orderDetailRepository:OrderDetailRepository,
    private readonly ordersService: OrdersService, 
    private readonly productsService: ProductsService,
  ) {
    const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Access token de MercadoPago no configurado.');
    }

    this.client = new MercadoPagoConfig({ accessToken });
  
  }
  
  async createPagoWithOrderDetail(preferenceData: any, orderDetailId: string): Promise<any> {
    try {
      // Obtener los detalles de la orden
      const orderDetail = await this.orderDetailRepository.findOneOrderDetailRepository(orderDetailId);
  
      if (!orderDetail) {
        throw new Error('El detalle de la ordenDetails no existe');
      }
  
      // Obtener los productos relacionados
      const products = orderDetail.products.map(product => ({
        id: product.id,
        title: product.name,  // Título del producto
        quantity: 1,          // Ajustar según los datos
        unit_price: parseFloat(product.price.toString()),
      }));
      
      // Crear preferencia en MercadoPago
      const preference = new Preference(this.client);
      const response = await preference.create({
        body: {
          items: products,
          back_urls: preferenceData.back_urls || {
            success: 'http://localhost:8080/api/feedback',
            failure: 'http://localhost:8080/api/feedback',
            pending: 'http://localhost:8080/api/feedback',
          },
          auto_return: preferenceData.auto_return || 'approved',
        },
      });
  
      console.log(response);
  
      const mercadoPago = this.mercadoPagoRepository.create({
        pagoId: response.id,
        totalAmount:orderDetail.price,
        externalReference: orderDetailId, // Usar el ID del detalle
        order: orderDetail.order,
        pagoStatus: 'pending',         // Relacionar con la orden
      });
  
      await this.mercadoPagoRepository.save(mercadoPago);
  
      return response;
    } catch (error) {
      console.error(`Error al crear el pago: ${error.message}`);
      throw new Error(`Error en MercadoPago: ${error.message}`);
    }
  }
}

