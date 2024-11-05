import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { Repository} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>
){}
    async findAll(): Promise<Products[]>{
        return this.productsRepository.find()
    }

    async findOne(id:string): Promise<Products>{
        return this.productsRepository.findOne({where:{id}})
    }
    
    async create(products:Products): Promise<Products>{
        const newProduct = this.productsRepository.create(products)
        return await this.productsRepository.save(newProduct)
    }

    async update(id:string ,product:Partial<Products>):Promise<Products>{
        await this.productsRepository.update(id, product)
        return this.productsRepository.findOneBy({id});
    }


}