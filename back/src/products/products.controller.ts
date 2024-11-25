import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipes';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/auth/roleGuard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HybridAuthGuard } from 'src/auth/hybridAuthGuard.guard';

@Controller('products')
// @UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findProducts(): Promise<Products[]> {
    return await this.productsService.findProducts();
  }

  @Get('productsHome')
  // @UseGuards(HybridAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  async arrayOfProductsHomeController() {
    return await this.productsService.arrayOfProductsHomeService()
  }


  @Get(':id')
  async findOneProducts(@Param('id', UUIDValidationPipe) id: string) {
    return await this.productsService.findOneProducts(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images', 3))
  async createProducts(@Body() products: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.createProducts(products, files);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images', 3))
  async updateProducts(@Param('id') id: string, @Body() products: UpdateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productsService.updateProducts(id, products, files);
  }

  
  @Put('editProductsHome/:id')
  // @UseGuards(HybridAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  async updateArrayOfProductsHomeController(@Param('id', UUIDValidationPipe) id: string) {
    return await this.productsService.updateArrayOfProductsHomeService(id)
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteProducts(@Param('id', UUIDValidationPipe) id: string, @Res() res: Response) {
    const deleteId = await this.productsService.deleteProducts(id);
    return res.status(200).json({ message: `The product with id ${deleteId.id} was successfully deleted` })
  }

}
