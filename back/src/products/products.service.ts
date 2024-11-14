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
    return await this.productsRepository.findProductsData();
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
  
  async getSuscription(userId: string): Promise<Products[]> {
    // Obtener usuario
    const user = await this.userService.findOneUserService(userId);
    console.log('Usuario:', user); // Verifica que el usuario tiene el campo isSuscription
  
    // Verificar si el usuario tiene el campo isSuscription correctamente definido
    if (user.isSuscription === undefined || user.isSuscription === null) {
      throw new Error('El campo isSuscription del usuario no está definido correctamente');
    }
  
    // Obtener lista de productos
    const products = await this.productsRepository.findProductsSuscription();
    console.log('Productos recuperados:', products); // Verifica los productos y suscripciones
  
    // Verifica que los productos tengan el campo suscription correctamente asignado
    if (products.length === 0) {
      console.log('No se encontraron productos.');
      return []; // Si no hay productos, retorna un array vacío
    }
  
    // Filtrar productos dependiendo de la suscripción del usuario
    if (user.isSuscription) {
      console.log('Mostrando productos completos (con suscripción)');
      // Si el usuario está suscrito, devolver todos los productos con suscripción
      return products.filter(product => product.suscription === true); // Asegúrate que el campo suscription existe y es un booleano
    } else {
      console.log('Mostrando productos limitados (sin suscripción)');
      // Si el usuario no está suscrito, devolver solo los productos sin suscripción
      return products.filter(product => product.suscription === false); // Asegúrate que el campo suscription existe y es un booleano
    }
  }
  

}
