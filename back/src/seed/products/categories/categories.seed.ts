import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { In, Repository } from "typeorm";
import { categories } from "./categoriesMock";

@Injectable()
export class CategoriesSeed{
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>){
    }

    async categoriesSeed() {
        const existCategories = await this.categoriesRepository.find({where:{name:In(categories)},});

        for (const categoresMock of categories){
            if(!existCategories.some((category)=>category.name === categoresMock))
            {
                const category = new Categories();
                category.name = categoresMock;
                await this.categoriesRepository.save(category)
            }    
        }
    }
}