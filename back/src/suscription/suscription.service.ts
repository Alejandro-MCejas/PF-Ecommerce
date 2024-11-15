import { Injectable } from '@nestjs/common';
import { Products } from 'src/entities/products.entity';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SuscriptionService {
  constructor(
    private readonly userService:UsersService,
    private readonly productsService:ProductsService,
  ){}

  async getSuscription(userId: string): Promise<Products[]> {
    const user = await this.userService.findOneUserService(userId);

    if (user.isSuscription === undefined || user.isSuscription === null) {
      throw new Error('El campo isSuscription del usuario no está definido correctamente');
    }

    const products = await this.productsService.findProducts();

    if (products.length === 0) {
      return []; 
    }
    if (user.isSuscription) {
      return products.filter(product => product.suscription === true); 
    } else {
      return products.filter(product => product.suscription === false);
    }
  }

}
