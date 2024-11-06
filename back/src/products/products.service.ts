import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService:CloudinaryService,
  )
  {}

  findAll(): Promise<Products[]> {
    return this.productsRepository.findAll();
  }

  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  async create(products: Products, files: Express.Multer.File[]): Promise<Products> {
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file); 
        imageUrls.push(imageUrl.secure_url); 
      }
    }

    return this.productsRepository.create(products, imageUrls);
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
}
