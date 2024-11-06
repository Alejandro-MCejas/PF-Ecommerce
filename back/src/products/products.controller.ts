import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll():Promise<Products[]> {
    return  await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 1))
  async create(@Body() products: Products, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.create(products, files);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() products:Products) {
    return await this.productsService.update(id,products);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
