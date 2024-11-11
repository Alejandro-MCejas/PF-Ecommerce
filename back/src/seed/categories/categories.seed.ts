import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { In, Repository } from "typeorm";
import { categories } from "./categoriesMock";


@Injectable()
export class CategoriesSeed{
    constructor( @InjectRepository(Categories) private readonly categoriesRepository:Repository<Categories>)
    {}

    async seedCategories() {
        const existingCategories = await this.categoriesRepository.find({
            where:{ name: In(categories)},
        });
    
        for(const categoryName of categories){
            if(
                !existingCategories.some((category)=> category.name === categoryName)
            ){
                const category = new Categories();
                category.name = categoryName;
                await this.categoriesRepository.save(category)
            }
        }
    }
    
    
} 