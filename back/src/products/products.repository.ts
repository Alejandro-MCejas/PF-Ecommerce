import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { Repository} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>,

){}
    async findProductsData(): Promise<Products[]>{
        return await this.productsRepository.find()
    }

    async findOneByProductsId(id:string): Promise<Products>{
        return await this.productsRepository.findOne({where:{id}})
    }
    
    async createProductsData(products: Products, image: string[]): Promise<Products> {
        const newProduct = this.productsRepository.create({
            ...products, 
            image: image, 
        });
    
        return await this.productsRepository.save(newProduct);
    }

    async updateProductsData(id:string ,product:Partial<Products>):Promise<Products>{
        await this.productsRepository.update(id, product)
        return this.productsRepository.findOneBy({id});
    }

    async deleteProductsData(id:string):Promise<Products>{
        const product = await this.productsRepository.findOne({where:{id}})
        await this.productsRepository.delete(product)
        return product
    }

}