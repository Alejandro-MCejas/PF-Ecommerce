import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import { response } from 'express';
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
    @InjectRepository(mercadoPago) private readonly mercadoPagoRepository: Repository<mercadoPago>,
    private readonly orderDetailRepository: OrderDetailRepository,
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
      const orderDetail = await this.orderDetailRepository.findOneOrderDetailRepository(orderDetailId);
  
      if (!orderDetail) {
        throw new Error('El detalle de la orden no existe');
      }
  
      // Mapear los productos desde `orderProducts`
      const products = orderDetail.orderProducts.map(orderProduct => ({
        id: orderProduct.product.id,
        title: orderProduct.product.name,
        quantity: orderProduct.quantity, // Cantidad desde la relación
        unit_price: parseFloat(orderProduct.product.price.toString()), // Precio unitario
      }));
  
      // Calcular el total basado en los productos
      const totalAmount = products.reduce(
        (total, product) => total + product.quantity * product.unit_price,
        0,
      );
  
      // Validar el total
      if (Math.abs(totalAmount - orderDetail.price) > 0.01) {
        console.error(`Discrepancia en el total: Calculado ${totalAmount}, esperado ${orderDetail.price}`);
        throw new Error(
          `Discrepancia detectada: el total calculado (${totalAmount}) no coincide con el esperado (${orderDetail.price}).`,
        );
      }
  
      const preference = new Preference(this.client);
      
      // Actualizar la preferencia con las URLs correctas
      const updatedResponse = await preference.create({
        body: {
          items: products,
          back_urls:{
            success: `https://pf-ecommerce2024.vercel.app/cart/paymentResult/orderDetailId:${orderDetailId}`,
            failure: `https://pf-ecommerce2024.vercel.app/cart/paymentResult/orderDetailId:${orderDetailId}`,
            pending: `https://pf-ecommerce2024.vercel.app/cart/paymentResult/orderDetailId:${orderDetailId}`,
          },
          auto_return: preferenceData.auto_return || 'approved',
        },
      });
  
      const mercadoPago = this.mercadoPagoRepository.create({
        pagoId: updatedResponse.id,
        totalAmount: orderDetail.price,
        externalReference: orderDetailId,
        order: orderDetail.order,
        pagoStatus: 'pending',
      });

      await this.mercadoPagoRepository.save(mercadoPago);

      return updatedResponse;
    } catch (error) {
      console.error(`Error al crear el pago: ${error.message}`);
      throw new Error(`Error en MercadoPago: ${error.message}`);
    }
  }
}

