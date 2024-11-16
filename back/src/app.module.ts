import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { SharedModule } from './shared-module/shared-module.module';
import { SuscriptionModule } from './suscription/suscription.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
  }),ProductsModule, UsersModule, OrdersModule, OrderDetailModule, CategoriesModule, CloudinaryModule, AuthModule, ReviewsModule, SharedModule, SuscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
