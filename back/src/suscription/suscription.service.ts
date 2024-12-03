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
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class SuscriptionService {
  constructor(
    @InjectRepository(Suscription)
    private suscriptionRepository: Repository<Suscription>,
    private readonly userService: UsersService,
    private readonly productsService: ProductsService,
    private readonly productsRepository: ProductsRepository,
    private readonly userRepository: UsersRepository,
  ) { }

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
  
  async createSuscription(createSuscription: CreateSuscriptionDto): Promise<{ preferenceId: string }> {
    const { userId } = createSuscription;

    if (!isUUID(userId)) {
        throw new Error(`El userId ${userId} no es un UUID válido`);
    }

    const priceSuscription = 5;

    const user = await this.userRepository.findOneUserRepository(userId);
    if (!user) {
        throw new Error('User not found');
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

    const productIds = product.map((product) => product.id);

    const suscription = this.suscriptionRepository.create({
        user,
        price: priceSuscription,
        startDate,
        endDate,
        type: 'basic',
        productIds,
    });

    const savedSuscription = await this.suscriptionRepository.save(suscription);

    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7372204931376506-111513-31b44745f8978a1ef22c2f14a303b736-2095892005' });
    const preference = new Preference(client);

    const items = [
        {
            id: savedSuscription.id,
            title: `Suscripción ${savedSuscription.type}`,
            quantity: 1,
            unit_price: savedSuscription.price,
        },
    ];

    let preferenceId: string;
    try {
        const response = await preference.create({
            body: {
                items,
                back_urls: {
                  success: `http://localhost:4000/subscription/paymentResult/feedback?status=approved&userId=${userId}`,
                  failure: `http://localhost:4000/subscription/paymentResult/feedback?status=failure&userId=${userId}`,
                  pending: `http://localhost:4000/subscription/paymentResult/feedback?status=pending&userId=${userId}`,
                },
                external_reference: userId,
            },
        });
        preferenceId = response.id; // Extraer el ID de la preferencia.
        console.log('Preference creada con ID:', preferenceId);
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        throw new Error('Failed to create payment preference');
    }

    // Actualizar al usuario como suscriptor si es necesario.
    if (!user.isSuscription) {
        user.isSuscription = true;
        await this.userRepository.updateUserRepository(userId, user);
    }

    // Devolver el preferenceId generado al frontend.
    return { preferenceId };
  }

  async cancelSuscription(userId: string): Promise<string> {
    if (!isUUID(userId)) {
      throw new Error(`El userId ${userId} no es un UUID válido`);
    }

    const user = await this.userRepository.findOneUserRepository(userId);
    if (!user) {
      throw new Error('User not found');
    }

    console.log('Actualizando usuario:', userId);

    const updatedUser = await this.userRepository.updateUserRepository(userId, { isSuscription: false });

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    console.log('Usuario actualizado:', updatedUser);

    return `Suscription status for user ${userId} set to false`;
  }

  
}
