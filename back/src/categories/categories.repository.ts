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
        return await this.categoriesRepository.update(id, category)
    }

    async deleteCategoryRepository(id: string) {
        return await this.categoriesRepository.delete(id)
    }
}
