import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";





@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>) { }

    async findCategoriesRepository() {
        return await this.categoriesRepository.find()
    }

    async findOneCategoryRepository(id: string) {
        return await this.categoriesRepository.findOne({ where: { id } })
    }

    async createCategoryRepository(category: { name: string }) {
        return await this.categoriesRepository.save(
            this.categoriesRepository.create(category)
        )
    }

    async updateCategoryRepository(id: string, category: { name: string }) {
        const existingCategory = await this.categoriesRepository.findOne({ where: { id } })

        if (!existingCategory) {
            return null
        }

        Object.assign(existingCategory, category)

        await this.categoriesRepository.save(existingCategory)

        return existingCategory
    }
    async deleteCategoryRepository(id: string) {

        const deletedCetegory = await this.categoriesRepository.findOne({ where: { id } })

        await this.categoriesRepository.delete(id)

        return deletedCetegory
    }
}
