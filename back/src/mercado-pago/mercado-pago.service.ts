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

  // async createPagoWithOrderDetail(preferenceData: any, orderDetailId: string): Promise<any> {
  //   try {
  //     // Obtener los detalles de la orden
  //     const orderDetail = await this.orderDetailRepository.findOneOrderDetailRepository(orderDetailId);

  //     if (!orderDetail) {
  //       throw new Error('El detalle de la ordenDetails no existe');
  //     }

  //     // Obtener los productos relacionados
  //     const products = orderDetail.products.map(product => ({
  //       id: product.id,
  //       title: product.name,  // Título del producto
  //       quantity: 1,          // Ajustar según los datos
  //       unit_price: parseFloat(product.price.toString()),
  //     }));

  //     // Crear preferencia en MercadoPago
  //     const preference = new Preference(this.client);
  //     const response = await preference.create({
  //       body: {
  //         items: products,
  //         back_urls: preferenceData.back_urls || {
  //             success: `http://localhost:3000/mercado-pago/feedback?status=approved&payment_id=${orderDetailId}&merchant_order_id=${response.id}`,
  //             failure: `http://localhost:3000/mercado-pago/feedback/?status=failure&external_reference=${orderDetailId}`,
  //             pending: `http://localhost:3000/mercado-pago/feedback/?status=pending&external_reference=${orderDetailId}`,
  //         },
  //         auto_return: preferenceData.auto_return || 'approved',
  //       },
  //     });

  //     console.log(response);

  //     const mercadoPago = this.mercadoPagoRepository.create({
  //       pagoId: response.id,
  //       totalAmount:orderDetail.price,
  //       externalReference: orderDetailId, // Usar el ID del detalle
  //       order: orderDetail.order,
  //       pagoStatus: 'pending',         // Relacionar con la orden
  //     });

  //     await this.mercadoPagoRepository.save(mercadoPago);

  //     return response;
  //   } catch (error) {
  //     console.error(`Error al crear el pago: ${error.message}`);
  //     throw new Error(`Error en MercadoPago: ${error.message}`);
  //   }
  // }

  async createPagoWithOrderDetail(preferenceData: any, orderDetailId: string): Promise<any> {
    try {
      // Obtener los detalles de la orden
      const orderDetail = await this.orderDetailRepository.findOneOrderDetailRepository(orderDetailId);

      if (!orderDetail) {
        throw new Error('El detalle de la orden no existe');
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

      // Definir las URLs de retroceso correctamente
      const backUrls = {
        success: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
        failure: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
        pending: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
      };

      // Crear la preferencia con los productos y las URLs de retroceso
      const response = await preference.create({
        body: {
          items: products,
          back_urls: backUrls,
          auto_return: preferenceData.auto_return || 'approved',  // Verifica que esté configurado correctamente
        },
      });

      // Ahora, asignar el 'merchant_order_id' a las URLs
      const updatedBackUrls = {
        success: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
        failure: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
        pending: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
      };

      // Actualizar la preferencia con las URLs correctas
      const updatedResponse = await preference.create({
        body: {
          items: products,
          back_urls: updatedBackUrls,
          auto_return: preferenceData.auto_return || 'approved',
        },
      });

      console.log(updatedResponse);

      const mercadoPago = this.mercadoPagoRepository.create({
        pagoId: updatedResponse.id,
        totalAmount: orderDetail.price,
        externalReference: orderDetailId, // Usar el ID del detalle
        order: orderDetail.order,
        pagoStatus: 'pending',  // Relacionar con la orden
      });

      await this.mercadoPagoRepository.save(mercadoPago);

      return updatedResponse;
    } catch (error) {
      console.error(`Error al crear el pago: ${error.message}`);
      throw new Error(`Error en MercadoPago: ${error.message}`);
    }
  }

  
}

