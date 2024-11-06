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

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne(id);
  }

  async create(products: Products, files: Express.Multer.File[]): Promise<Products> {
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file); 
        imageUrls.push(imageUrl.secure_url); 
      }
    }

    return await this.productsRepository.create(products, imageUrls);
  }

  async update(id:string, products:Partial<Products>){
    const product = await this.productsRepository.update(id, products)

    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }
    
    return product;
  }

  async delete(id: string):Promise<Products> {
    const product = await this.productsRepository.findOne(id)
    
    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }

    return this.productsRepository.delete(id);
  }
}
