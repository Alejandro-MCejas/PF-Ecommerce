import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { CategoriesRepository } from './categories.repository';
import { CategoriesSeed } from 'src/seed/categories/categories.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, CategoriesSeed],
  exports:[CategoriesRepository, CategoriesService, CategoriesSeed, TypeOrmModule],
})
export class CategoriesModule { }
