import { Module } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { SuscriptionController } from './suscription.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { Suscription } from 'src/entities/suscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoPagoModule } from 'src/mercado-pago/mercado-pago.module';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription]), UsersModule, ProductsModule, MercadoPagoModule],
  controllers: [SuscriptionController],
  providers: [SuscriptionService],
})
export class SuscriptionModule {}
