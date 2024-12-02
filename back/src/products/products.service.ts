import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';
import { ProductIdAndQuantity } from 'src/orders/dto/create-order.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService,
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

  async createProducts(products: CreateProductDto, files: Express.Multer.File[], categoriesId: string): Promise<Products> {

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


    return await this.productsRepository.createProductsData(newProducts, imageUrls, categoriesId)
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

  async getProductsWithStock(productsIds: Array<ProductIdAndQuantity>) {
    const productsWithStock = [];

    for (const { id, quantity } of productsIds) {
      const product = await this.findOneProducts(id); // Método que busca un producto
      if (product && product.stock >= quantity) {
        productsWithStock.push({ ...product, quantity });
      }
    }

    return productsWithStock
  }

  async reduceProductStockService(id: string, quantity: number) {
    const product = await this.findOneProducts(id);
    if (!product) throw new Error('Producto no encontrado');

    if (product.stock < quantity) throw new Error('Stock insuficiente');

    product.stock -= quantity;
    await this.productsRepository.updateProductStock(product.id, product.stock);
  }


  async arrayOfProductsHomeService() {
    return await this.productsRepository.arrayOfProductsHomeRepository()
  }

  async arrayOfProductsSuscriptionService() {
    return await this.productsRepository.arrayOfProductsSuscriptionRepository()
  }

  async updateArrayOfProductsHomeService(products: Products[]) {
    if (!products || products.length === 0) {
      throw new Error('The product list cannot be empty');
    }

    // Obtén los productos actualmente destacados
    const currentFeaturedProducts = await this.productsRepository.arrayOfProductsHomeRepository();

    // Calcula los productos que serán destacados y deseleccionados
    const productsToFeature = products.filter(p =>
      !currentFeaturedProducts.some(cfp => cfp.id === p.id) && !p.isFeatured
    );
    const productsToUnfeature = products.filter(p =>
      currentFeaturedProducts.some(cfp => cfp.id === p.id)
    );

    const totalFeaturedCount =
      currentFeaturedProducts.length - productsToUnfeature.length + productsToFeature.length;

    if (totalFeaturedCount > 4) {
      throw new Error('Cannot mark more than 4 products as featured');
    }

    const updatedProducts = [];

    for (const product of products) {
      // Verifica si el producto existe en la base de datos
      const existingProduct = await this.productsRepository.findOneByProductsId(product.id);
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${product.id} not found`);
      }

      // Alterna el estado de `isFeatured` basado en el valor recibido
      existingProduct.isFeatured = !existingProduct.isFeatured;

      // Actualiza el producto en la base de datos
      updatedProducts.push(await this.productsRepository.updateArrayOfProductsHomeRepository(product.id, existingProduct.isFeatured));
    }

    return {
      message: 'Products updated successfully',
      updatedProducts,
    };
  }

  async updateArrayOfProductSuscriptionService(products: { id: string }[]) {
    if (!products || products.length === 0) {
      throw new Error('The product list cannot be empty');
    }

    // Obtén los productos actualmente destacados
    const currentFeaturedProducts = await this.productsRepository.arrayOfProductsSuscriptionRepository();

    // Identifica productos a añadir o quitar de suscripción
    const productIds = products.map((p) => p.id);

    const productsToUnfeature = currentFeaturedProducts.filter((cfp) =>
      productIds.includes(cfp.id)
    );

    const productsToFeature = products.filter(
      (p) => !currentFeaturedProducts.some((cfp) => cfp.id === p.id)
    );

    // Mantener un máximo de 2 productos con `suscription: true`
    const updatedProducts = [];

    // Retirar productos de suscripción
    for (const product of productsToUnfeature) {
      const existingProduct = await this.productsRepository.findOneByProductsId(product.id);
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${product.id} not found`);
      }

      existingProduct.suscription = false;
      await this.productsRepository.updateArrayOfProductsSuscriptionRepository(product.id, false);
      updatedProducts.push(existingProduct);
    }

    // Agregar productos a suscripción
    for (const product of productsToFeature) {
      if (updatedProducts.filter((p) => p.suscription).length >= 2) break;

      const existingProduct = await this.productsRepository.findOneByProductsId(product.id);
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${product.id} not found`);
      }

      existingProduct.suscription = true;
      await this.productsRepository.updateArrayOfProductsSuscriptionRepository(product.id, true);
      updatedProducts.push(existingProduct);
    }

    // Si hay más de 2 productos con suscripción, corregir automáticamente
    const extraFeatured = updatedProducts.filter((p) => p.suscription).slice(2);
    for (const product of extraFeatured) {
      product.suscription = false;
      await this.productsRepository.updateArrayOfProductsSuscriptionRepository(product.id, false);
    }

    return {
      message: 'Products updated successfully',
      updatedProducts: updatedProducts.slice(0, 2), // Devuelve los 2 productos finales con suscripción
    };
  }

}
