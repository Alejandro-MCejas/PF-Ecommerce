import { BadRequestException, Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { In, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoriesRepository } from "src/categories/categories.repository";

@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>,
    private readonly categoriesRepository:CategoriesRepository,
    ) { }
    async findProductsData(): Promise<Products[]> {
        return await this.productsRepository.find({ relations: ['categories'] });
    }

    async findProductsSuscription(where: any): Promise<Products[]> {
        return await this.productsRepository.find({
            where,
            select: ['id', 'name', 'image', 'description', 'stock', 'price', 'suscription'],
            relations: ['categories']
        })
    }

    async findOneByProductsId(id: string): Promise<Products> {
        return await this.productsRepository.findOne({ where: { id }, relations: ['reviews', 'categories'] })
    }

    async createProductsData(products: CreateProductDto, image: string[], categoriesId:string | undefined): Promise<Products> {
        let categoriesEntity = null;

    // Solo buscar la categoría si categoriesId es proporcionado
    if (categoriesId) {
        categoriesEntity = await this.categoriesRepository.findOneCategoryRepository(categoriesId);

        if (!categoriesEntity) {
            throw new Error('Category not found'); // Lanza un error si no se encuentra la categoría
        }
    }

    // Crear el producto con las categorías si fueron proporcionadas
        const newProduct = this.productsRepository.create({
            ...products,
            image: image,
            categories: categoriesEntity ? [categoriesEntity] : [], // Si categoriesEntity existe, asigna el array con la categoría, sino asigna un array vacío
        });

    // Guardar el producto creado
        return await this.productsRepository.save(newProduct);;
    }

    async updateProductsData(id: string, product: UpdateProductDto): Promise<Products> {
        await this.productsRepository.update(id, product)
        return this.productsRepository.findOneBy({ id });
    }

    async deleteProductsData(id: string): Promise<Products> {
        const product = await this.productsRepository.findOne({ where: { id } })
        await this.productsRepository.delete(id)
        return product
    }

    async findByIds(ids: string[]) {
        return await this.productsRepository.find({
            where: {
                id: In(ids),
                stock: MoreThan(0)
            },
            select: ['id', 'price', 'stock']
        })
    }

    async arrayOfProductsHomeRepository() {

        return await this.productsRepository.find({
            where: {
                isFeatured: true
            },
            take: 4,
            relations: ['categories']
        })

    }

    async arrayOfProductsSuscriptionRepository() {

        return await this.productsRepository.find({
            where: {
                suscription: true
            },
            take: 2,
            relations: ['categories']
        })

    }

    async updateArrayOfProductsHomeRepository(id: string, isFeatured: boolean) {
        await this.productsRepository.update(id, { isFeatured })

        return this.productsRepository.findOneBy({ id })
    }

    async updateArrayOfProductsSuscriptionRepository(id: string, suscription: boolean) {
        await this.productsRepository.update(id, { suscription })

        return this.productsRepository.findOneBy({ id })
    }

    async updateProductStock(id: string, stock: number) {
        if (stock < 0) throw new BadRequestException('El stock no puede ser negativo');
        await this.productsRepository.update(id, { stock });
    }


}