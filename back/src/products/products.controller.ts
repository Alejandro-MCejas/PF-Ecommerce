import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProducts():Promise<Products[]> {
    return  await this.productsService.findProducts();
  }

  @Get(':id')
  async findOneProducts(@Param('id') id: string) {
    return await this.productsService.findOneProducts(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 1))
  async createProducts(@Body() products: Products, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.createProducts(products, files);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 3))
  async updateProducts(@Param('id') id: string, @Body() products:Products, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.updateProducts(id,products, files);
  }

  @Delete(':id')
  async deleteProducts(@Param('id') id: string) {
    return await this.productsService.deleteProducts(id);
  }
}
