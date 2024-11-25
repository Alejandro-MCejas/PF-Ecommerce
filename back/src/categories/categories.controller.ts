import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Response } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/roleGuard.guard';
import { UserRole } from 'src/users/enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HybridAuthGuard } from 'src/auth/hybridAuthGuard.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async findAllCategoriesController(@Res() res: Response) {
    const categories = await this.categoriesService.findAllCategoriesService();
    return res.status(200).json(categories)
  }

  @Get(':id')
  async findOneCategoryController(@Param('id') id: string, @Res() res: Response) {
    const category = await this.categoriesService.findOneCategoryService(id);
    return res.status(200).json(category);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createCategoryController(@Body() category: { name: string }, @Res() res: Response) {
    const newCategory = await this.categoriesService.createCategoryService(category);
    return res.status(201).json(newCategory);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard, RoleGuard)  
  @Roles(UserRole.ADMIN)
  async updateCategoryController(@Param('id') id: string, @Body() category: { name: string }, @Res() res: Response) {
    const updatedCategory = await this.categoriesService.updateCategoryService(id, category);
    return res.status(200).json({ message: `La categoria con el id: ${updatedCategory.id} ha sido actualizada` });

  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteCategoryController(@Param('id') id: string, @Res() res: Response) {
    const deletedCategory = await this.categoriesService.deleteCategoryService(id);
    return res.status(200).json({ message: `La categoria con el id: ${deletedCategory.id} ha sido eliminada` })
  }
}
