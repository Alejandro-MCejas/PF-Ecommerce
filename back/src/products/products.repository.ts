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
}