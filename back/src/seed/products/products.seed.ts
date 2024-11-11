import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { productsMock } from "./products";
import { Categories } from "src/entities/categories.entity";

@Injectable()
export class ProductsSeed{
    constructor(@InjectRepository(Products) private readonly productsRepository:Repository<Products>, @InjectRepository(Categories) private readonly categoriesRepository:Repository<Categories>)
    {}

    async findCategoryByName(category: string) {
        const foundCategory = await this.categoriesRepository.findOne({
            where: { name: category },
        });
    
        if (!foundCategory) {
            throw new Error(`Category ${category} not found`);
        }
        return foundCategory;
    }

    async seedProducts() {
        const existingProductNames = (
            await this.productsRepository.find({ select: ['name'] })
        ).map((product) => product.name);
    
        const newProducts: Products[] = [];
    
        for (const productData of productsMock) {
            if (!existingProductNames.includes(productData.name)) {
                const product = new Products();
                product.name = productData.name;
                product.image = productData.image;
                product.description = productData.description;
                product.price = productData.price;
                product.stock = productData.stock;
    
                const category = await this.findCategoryByName(productData.categories);
                product.categories = category;
    
                newProducts.push(product);
            }
        }
    
        if (newProducts.length) {
            await this.productsRepository.save(newProducts);
            console.log(`${newProducts.length} productos insertados correctamente`);
        } else {
            console.log('No hay productos nuevos para insertar');
        }
    }
    
}    