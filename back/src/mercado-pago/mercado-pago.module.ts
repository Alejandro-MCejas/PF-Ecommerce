import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mercadoPago } from 'src/entities/mercadoPago.entity';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([mercadoPago]), OrderDetailModule, OrdersModule, ProductsModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
  exports:[]

})
export class MercadoPagoModule {}
