import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Reviews } from 'src/entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews]),  // Este módulo importa la entidad de Reviews para que se pueda usar en el servicio
    ProductsModule,  // Si es necesario acceder a los productos, puedes importar el módulo de productos
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
