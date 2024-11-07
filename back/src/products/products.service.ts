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
    return await this.productsRepository.findProductsData();
  }

  async findOne(id: string) {
    return await this.productsRepository.findOneByProductsId(id);
  }

  async createProducts(products: Products, files: Express.Multer.File[]): Promise<Products> {
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file); 
        imageUrls.push(imageUrl.secure_url); 
      }
    }

    return await this.productsRepository.createProductsData(products, imageUrls);
  }

  async updateProducts(id:string, products:Partial<Products>, files: Express.Multer.File[]): Promise<Products>{
    const product = await this.productsRepository.findOneByProductsId(id);

    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }
    
    const imageUrls: string[] = Array.isArray(product.image) ? [...product.image] : []
    if(files && files.length > 0){
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file); 
        imageUrls.push(imageUrl.secure_url); 
      }
    }
    const updatedData = {
      ...products,
      image: imageUrls,
    };
    return await this.productsRepository.updateProductsData(id, updatedData)
  }

  async deleteProducts(id: string):Promise<Products> {
    const product = await this.productsRepository.findOneByProductsId(id)
    
    if(!product){
      throw new NotFoundException(`Products with ID ${id} not found`);
    }

    return this.productsRepository.deleteProductsData(id);
  }
}
