import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) { }

  async findAllCategoriesService() {
    return await this.categoriesRepository.findCategoriesRepository()
  }

  async findOneCategoryService(id: string) {
    return await this.categoriesRepository.findOneCategoryRepository(id)
  }
  async createCategoryService(category: { name: string }) {
    return await this.categoriesRepository.createCategoryRepository(category)
  }

  async updateCategoryService(id: string, category: { name: string }) {
    return await this.categoriesRepository.updateCategoryRepository(id, category)
  }

  async deleteCategoryService(id: string) {
    return await this.categoriesRepository.deleteCategoryRepository(id)
  }
}
