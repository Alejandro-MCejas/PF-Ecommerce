import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>
){}
    async findAll(): Promise<Products[]>{
        return this.productsRepository.find()
    }

    async findOne(id): Promise<Products>{
        return this.productsRepository.findOne(id)
    }
    
    async create(products:Products): Promise<Products>{
        const newProduct = this.productsRepository.create(products)
        return await this.productsRepository.save(newProduct)
    }
}