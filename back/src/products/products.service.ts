import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';
import { ProductId } from 'src/orders/dto/create-order.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from 'src/entities/categories.entity';
// import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly categories:Categories[],
  ) { }

  async findProducts(): Promise<Products[]> {
    const product = await this.productsRepository.findProductsData();
    const now = new Date(); 

    console.log("Hora actual local:", now);
    return product.map(product => {
      let discountedPrice = product.price;
    
      if (product.discount > 0 &&
        product.discountStartDate &&
        product.discountEndDate &&
        now >= new Date(product.discountStartDate) &&
        now <= new Date(product.discountEndDate)
      ) {
        discountedPrice = product.price - (product.price * product.discount) / 100;
      }
  
      discountedPrice = Math.floor(discountedPrice * 100) / 100;
      
      return {
        ...product,
        discountedPrice
      };
    }) 
  }

  async findOneProducts(id: string) {
    const ProductId = await this.productsRepository.findOneByProductsId(id);

    if (!ProductId) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    let discountedPrice = ProductId.price;

    if (ProductId.discount && ProductId.discount > 0) {
      discountedPrice = ProductId.price - (ProductId.price * ProductId.discount) / 100;
    }

    discountedPrice = Math.floor(discountedPrice * 100) / 100;
    return {
      ...ProductId,
      discountedPrice, 
  };

  }

  async createProducts(products: CreateProductDto, files: Express.Multer.File[]): Promise<Products> {
    const newProducts = {
      ...products,
      discountStartDate: products.discountStartDate || null,
      discountEndDate: products.discountEndDate || null,
    }
    
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file);
        imageUrls.push(imageUrl.secure_url);
      }
    }

    // let categoryEntities: Categories[] = [];
    // if (newProducts.categories && newProducts.categories.length > 0) {
    //   categoryEntities = await Promise.all(
    //     newProducts.categories.map(async (categoryName) => {
    //       let category = await this.categoriesRepository.findOneCategoryRepository(categoryName);
    //       if (!category) {
    //         category = await this.categoriesRepository.createCategoryRepository({ name: categoryName });
    //       }
    //       return category;
    //     }),
    //   );
    // }
    

    return await this.productsRepository.createProductsData(newProducts, imageUrls)
  }

  async updateProducts(id: string, products: UpdateProductDto, files: Express.Multer.File[]): Promise<Products> {
    const product = await this.productsRepository.findOneByProductsId(id);

    if (!product) {
      throw new NotFoundException(`Products with ID ${id} not found`);
    }

    const imageUrls: string[] = Array.isArray(product.image) ? [...product.image] : []
    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this.cloudinaryService.uploadImage(file);
        imageUrls.push(imageUrl.secure_url);
      }
    }

    if (products.discount !== undefined && (products.discount < 0 || products.discount > 100)) {
      throw new BadRequestException('Discount must be between 0 and 100');
    }

    const updatedData = {
      ...products,
      image: imageUrls,
    };
    return await this.productsRepository.updateProductsData(id, updatedData)
  }

  async deleteProducts(id: string): Promise<Products> {
    const product = await this.productsRepository.findOneByProductsId(id)

    if (!product) {
      throw new NotFoundException(`Products with ID ${id} not found`);
    }

    return this.productsRepository.deleteProductsData(id);
  }

  async getProductsWithStock(productsIds: Array<ProductId>) {
    const ids = productsIds.map(product => product.id)
    return await this.productsRepository.findByIds(ids)
  }

  async reduceProductStockService(id: string) {
    const product = await this.findOneProducts(id)

    if (!product) {
      throw new Error('Product not found')
    }

    if (product.stock === 0) {
      throw new Error('The product is out of stock ')
    }

    await this.productsRepository.updateProductsData(id, {
      stock: product.stock - 1
    })
  }

  async arrayOfProductsHomeService() {
    return await this.productsRepository.arrayOfProductsHomeRepository()
  }

  async updateArrayOfProductsHomeService(id: string) {

    const product = await this.productsRepository.findOneByProductsId(id)

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    const listOfProducts = await this.productsRepository.arrayOfProductsHomeRepository()

    if (!product.isFeatured && listOfProducts.length === 4) {
      
      throw new Error('Cannot mark more than 4 products as featured');
    }
  
    const newStatus = !product.isFeatured

    return await this.productsRepository.updateArrayOfProductsHomeRepository(id, newStatus)
  }


}
