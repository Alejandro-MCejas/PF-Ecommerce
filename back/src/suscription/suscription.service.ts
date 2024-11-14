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
    // Obtener usuario
    const user = await this.userService.findOneUserService(userId);
    console.log('Usuario:', user); // Verifica que el usuario tiene el campo isSuscription
  
    // Verificar si el usuario tiene el campo isSuscription correctamente definido
    if (user.isSuscription === undefined || user.isSuscription === null) {
      throw new Error('El campo isSuscription del usuario no está definido correctamente');
    }
  
    // Obtener lista de productos
    const products = await this.productsService.findProducts();
    console.log('Productos recuperados:', products); // Verifica los productos y suscripciones
  
    // Verifica que los productos tengan el campo suscription correctamente asignado
    if (products.length === 0) {
      console.log('No se encontraron productos.');
      return []; // Si no hay productos, retorna un array vacío
    }
  
    // Filtrar productos dependiendo de la suscripción del usuario
    if (user.isSuscription) {
      console.log('Mostrando productos completos (con suscripción)');
      // Si el usuario está suscrito, devolver todos los productos con suscripción
      return products.filter(product => product.suscription === true); // Asegúrate que el campo suscription existe y es un booleano
    } else {
      console.log('Mostrando productos limitados (sin suscripción)');
      // Si el usuario no está suscrito, devolver solo los productos sin suscripción
      return products.filter(product => product.suscription === false); // Asegúrate que el campo suscription existe y es un booleano
    }
  }
}
