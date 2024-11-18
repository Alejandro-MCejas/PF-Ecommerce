import { Injectable } from '@nestjs/common';
import { Products } from 'src/entities/products.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsService } from 'src/products/products.service';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { Suscription } from 'src/entities/suscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class SuscriptionService {
  constructor(
    @InjectRepository(Suscription)
    private suscriptionRepository: Repository<Suscription>,
    private readonly userService:UsersService,
    private readonly productsService:ProductsService,
    private readonly productsRepository:ProductsRepository,
    private readonly userRepository:UsersRepository,
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

  async createSuscription(createSuscription:CreateSuscriptionDto):Promise<Suscription>{
    const {userId} = createSuscription;
    if (!isUUID(userId)) {
      throw new Error(`El userId ${userId} no es un UUID válido`);
    }
    const priceSuscription = 5;

    const user = await this.userRepository.findOneUserRepository(userId);
    if(!user){
      throw new Error('User not found')
    }

    
    const product = await this.productsRepository.findProductsSuscription(
      { suscription: true }
    );
    if (product.length === 0) {
      throw new Error('No subscription products available');
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const productIds = product.map(product => product.id);

    console.log({
      user: { id: user.id },
      price: priceSuscription,
      startDate,
      endDate,
      productIds,
    });

    const suscription = this.suscriptionRepository.create({
      user,
      price: priceSuscription,
      startDate,
      endDate,
      type:'basic',
      productIds,
    });

    

    await this.suscriptionRepository.save(suscription);
    
    if (!user.isSuscription) {
      user.isSuscription = true;
      await this.userRepository.updateUserRepository(userId, user);
    }

    return suscription

  }
}
