import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsSeed } from 'src/seed/products/products.seed';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsSeed, CloudinaryConfig],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
