import { Module } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { SuscriptionController } from './suscription.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { Suscription } from 'src/entities/suscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription]), UsersModule, ProductsModule],
  controllers: [SuscriptionController],
  providers: [SuscriptionService],
})
export class SuscriptionModule {}
