import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import { response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { mercadoPago } from 'src/entities/mercadoPago.entity';
// import { Products } from 'src/entities/products.entity';
import { OrderDetailRepository } from 'src/order-detail/order-detail.repository';
import { ProductIdAndQuantity } from 'src/orders/dto/create-order.dto';
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
            success: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
            failure: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
            pending: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
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

  // async createPagoWithOrderDetail(preferenceData: any, orderDetailId: string): Promise<any> {
  //   try {
  //     // Obtener los detalles de la orden con las relaciones necesarias
  //     const orderDetail = await this.orderDetailRepository.findOneOrderDetailRepository(
  //       orderDetailId, // ID del detalle de la orden // Relaciones necesarias
  //     );
  
  //     if (!orderDetail) {
  //       throw new Error('El detalle de la orden no existe');
  //     }
  
  //     // Obtener las cantidades desde la entidad `OrderDetails` (relación `products`)
  //     const productQuantities: ProductIdAndQuantity[] = orderDetail.products.map(product => ({
  //       id: product.id,
  //       quantity: product.quantity, // Asegúrate de que `quantity` esté disponible aquí
  //     }));
  
  //     // Mapear los productos con la cantidad correcta
  //     const products = orderDetail.products.map(product => {
  //       const productQuantity = productQuantities.find(p => p.id === product.id)?.quantity || 1;
  
  //       return {
  //         id: product.id,
  //         title: product.name, // Título del producto
  //         quantity: productQuantity, // Cantidad desde `ProductIdAndQuantity`
  //         unit_price: parseFloat(product.price.toString()), // Precio unitario
  //       };
  //     });
  
  //     // Crear preferencia en MercadoPago
  //     const preference = new Preference(this.client);
  
  //     // Definir las URLs de retroceso
  //     const backUrls = {
  //       success: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
  //       failure: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
  //       pending: `http://localhost:4000/cart/paymentResult/orderDetailId:${orderDetailId}`,
  //     };
  
  //     // Crear la preferencia en MercadoPago
  //     const response = await preference.create({
  //       body: {
  //         items: products,
  //         back_urls: backUrls,
  //         auto_return: preferenceData.auto_return || 'approved',
  //       },
  //     });
  
  //     // Guardar el detalle del pago en la base de datos
  //     const mercadoPago = this.mercadoPagoRepository.create({
  //       pagoId: response.id,
  //       totalAmount: orderDetail.price,
  //       externalReference: orderDetailId, // Relación con el detalle de la orden
  //       order: orderDetail.order, // Relación con la orden
  //       pagoStatus: 'pending',
  //     });
  
  //     await this.mercadoPagoRepository.save(mercadoPago);
  
  //     return response;
  //   } catch (error) {
  //     console.error(`Error al crear el pago: ${error.message}`);
  //     throw new Error(`Error en MercadoPago: ${error.message}`);
  //   }
  // }

  
}

