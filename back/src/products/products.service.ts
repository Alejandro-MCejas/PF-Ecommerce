import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){

  }

  findAll(): Promise<Products[]> {
    return this.productsRepository.findAll();
  }

  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  create(products: Products) {
    return this.productsRepository.create(products);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
