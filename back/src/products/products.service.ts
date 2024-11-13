import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';
import { ProductId } from 'src/orders/dto/create-order.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService:CloudinaryService,
    private readonly userService:UsersService,
  )
  {}

  async findProducts(): Promise<Products[]> {
    return await this.productsRepository.findProductsPreview();
  }

  async findOneProducts(id: string) {
    const ProductId =  await this.productsRepository.findOneByProductsId(id);

    if(!ProductId){
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return this.productsRepository.findOneByProductsId(id);
    
  }

  async createProducts(products: CreateProductDto, files: Express.Multer.File[]): Promise<Products> {
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file); 
        imageUrls.push(imageUrl.secure_url); 
      }
    }

    return await this.productsRepository.createProductsData(products, imageUrls);
  }

  async updateProducts(id:string, products:UpdateProductDto, files: Express.Multer.File[]): Promise<Products>{
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

  async getProductsWithStock(productsIds: Array<ProductId>){
    const ids = productsIds.map(product => product.id)
    return await this.productsRepository.findByIds(ids)
  }

  async reduceProductStockService(id: string) {
    const product = await this.findOneProducts(id)

    if (!product) {
        throw new Error('El producto no existe')
    }

    if (product.stock === 0) {
        throw new Error('El producto no tiene stock')
    }

    await this.productsRepository.updateProductsData(id, {
        stock: product.stock - 1
    })
  }
  
  async getSuscription(userId:string):Promise<Products[]>{
    const user = await this.userService.findOneUserService(userId)

    if (user.isSuscription) {
      console.log('Mostrando productos completos (con suscripción)');
      // Si el usuario está suscrito, se devuelven los productos completos (con todos los detalles)
      return await this.productsRepository.findProductsData();
    // } else {
    //   console.log('Mostrando productos limitados (sin suscripción)');
    //   // Si el usuario NO está suscrito, se devuelven solo los productos con información básica
    //   return await this.productsRepository.findProductsPreview();
    }
  }

}
