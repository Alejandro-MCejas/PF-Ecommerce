import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsSeed } from 'src/seed/products/products.seed';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryController } from 'src/cloudinary/cloudinary.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CategoriesModule } from 'src/categories/categories.module';


@Module({
  imports: [TypeOrmModule.forFeature([Products]), CloudinaryModule, forwardRef(() => CategoriesModule)],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsSeed, CloudinaryConfig, CloudinaryController,],
  exports: [ProductsService, ProductsService,ProductsSeed],
})
export class ProductsModule {}
