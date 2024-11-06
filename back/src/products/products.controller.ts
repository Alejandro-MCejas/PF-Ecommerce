import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll():Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 1))
  async create(@Body() products: Products, @UploadedFiles() files: Express.Multer.File[]) {
    return this.productsService.create(products, files);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() products:Products) {
    return this.productsService.update(id,products);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
