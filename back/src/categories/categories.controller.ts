import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async findAllCategoriesController(@Res() res: Response) {
    const categories = await this.categoriesService.findAllCategoriesService();
    return res.status(200).json(categories)
  }

  @Get(':id')
  async findOneCategoryController(@Param('id') id: string, res: Response) {
    const category = await this.categoriesService.findOneCategoryService(id);
    return res.status(200).json(category);
  }

  @Post()
  async createCategoryController(@Body() category: { name: string }, res: Response) {
    const newCategory = await this.categoriesService.createCategoryService(category);
    return res.status(201).json(newCategory);
  }

  @Put(':id')
  async updateCategoryController(@Param('id') id: string, @Body() category: { name: string }, res: Response) {
    const updatedCategory = await this.categoriesService.updateCategoryService(id, category);
    return res.status(200).json(updatedCategory);
  }

  @Delete(':id')
  async deleteCategoryController(@Param('id') id: string, res: Response) {
    const deletedCategory = await this.categoriesService.deleteCategoryService(id);
    return res.status(200).json(deletedCategory)
  }
}
