import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { productsMock } from "./products";

@Injectable()
export class ProductsSeed{
    constructor(@InjectRepository(Products) private readonly productsRepository:Repository<Products>){}

    async seed() {
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
    
                // // Verifica o crea la categoría
                // const category = await this.findOrCreateCategoryByName(productData.category);
                // product.category_id = category;
    
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