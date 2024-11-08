import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipes';
import { HttpExceptionFilter } from 'src/validator/manejoErrores';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProducts():Promise<Products[]> {
    return  await this.productsService.findProducts();
  }

  @Get(':id')
  async findOneProducts(@Param('id',UUIDValidationPipe) id: string) {
    return await this.productsService.findOneProducts(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 3))
  async createProducts(@Body() products: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.createProducts(products, files);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 3))
  async updateProducts(@Param('id') id: string, @Body() products:UpdateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.updateProducts(id,products, files);
  }

  @Delete(':id')
  async deleteProducts(@Param('id', UUIDValidationPipe) id: string, @Res() res:Response) {
    const deleteId = await this.productsService.deleteProducts(id);
    return res.status(200).json({message:`The product with id ${deleteId.id} was successfully deleted`})
  }
}
