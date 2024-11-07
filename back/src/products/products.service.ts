import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';
import { ProductId } from 'src/orders/dto/create-order.dto';

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

  update(id:string, products:Partial<Products>){
    const product = this.productsRepository.update(id, products)

    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }
    
    return product;
  }

  delete(id: string) {
    const product = this.productsRepository.delete(id);

    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }
  }

  async getProductsWithStock(productsIds: Array<ProductId>){
    const ids = productsIds.map(product => product.id)
    return await this.productsRepository.findByIds(ids)
  }

  async reduceProductStockService(id: string) {
    const product = await this.findOne(id)

    if (!product) {
        throw new Error('El producto no existe')
    }

    if (product.stock === 0) {
        throw new Error('El producto no tiene stock')
    }

    await this.productsRepository.update(id, {
        stock: product.stock - 1
    })

}
}
