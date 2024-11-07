import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { In, MoreThan, Repository} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>
){}
    async findAll(): Promise<Products[]>{
        return await this.productsRepository.find()
    }

    async findOne(id:string): Promise<Products>{
        return await this.productsRepository.findOne({where:{id}})
    }
    
    async create(products:Products): Promise<Products>{
        const newProduct = this.productsRepository.create(products)
        return await this.productsRepository.save(newProduct)
    }

    async update(id:string ,product:Partial<Products>):Promise<Products>{
        await this.productsRepository.update(id, product)
        return await this.productsRepository.findOneBy({id});
    }

    async delete(id:string):Promise<void>{
        await this.productsRepository.delete(id)
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