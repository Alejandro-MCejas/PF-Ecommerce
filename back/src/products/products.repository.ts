import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { In, MoreThan, Repository} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>,

){}
    async findProductsData(): Promise<Products[]>{
        return await this.productsRepository.find({relations:['categories']});
    }

    async findProductsPreview(): Promise<Products[]>{
        return await this.productsRepository.find({select: ['id','name','image','description', 'stock', 'price'], 
            relations:['categories'], where: { suscription: false } })
    }

    async findOneByProductsId(id:string): Promise<Products>{
        return await this.productsRepository.findOne({where:{id}})
    }
    
    async createProductsData(products: CreateProductDto, image: string[]): Promise<Products> {
        const newProduct = this.productsRepository.create({
            ...products, 
            image: image, 
        });
    
        return await this.productsRepository.save(newProduct);
    }

    async updateProductsData(id:string ,product:UpdateProductDto):Promise<Products>{
        await this.productsRepository.update(id, product)
        return this.productsRepository.findOneBy({id});
    }

    async deleteProductsData(id:string):Promise<Products>{
        const product = await this.productsRepository.findOne({where:{id}})
        await this.productsRepository.delete(product)
        return product
    }

    async findByIds(ids: string[]){
        return await this.productsRepository.find({
            where: {
                id: In(ids),
                stock: MoreThan(0)
            },
            select: ['id', 'price', 'stock']
        })
    }

}