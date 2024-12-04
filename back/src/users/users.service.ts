import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { NotificationsService } from 'src/notifications/notifications.service';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository,
    private readonly notificationsService: NotificationsService
  ) { }

  private generateRandomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async findAllUsersService() {
    return await this.usersRepository.findUsersRepository()
  }

  async findOneUserService(id: string) {
    return await this.usersRepository.findOneUserRepository(id)
  }

  async createUserService(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUserRepository(createUserDto)
  }

  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.updateUserRepository(id, updateUserDto)
  }

  async deleteUserService(id: string) {
    return await this.usersRepository.deleteUserRepository(id)
  }

  async findUserByEmailService(email: string) {
    return await this.usersRepository.findUserByEmailRepository(email)
  }

  async findUserByEmailOrSubService(email: string, sub: string) {
    return await this.usersRepository.findUserByEmailOrSubRepository(email, sub);
  }

  async updateUserSubService(userId: string, sub: string) {
    return await this.usersRepository.updateUserSubRepository(userId, sub);
  }

  async addFavoriteProductService(userId: string, productId: string) {
    return await this.usersRepository.addFavoriteProductRepository(userId, productId);
  }

  async findAllFavoritesProductsService(userId: string) {
    return await this.usersRepository.findAllFavoritesProductsRepository(userId)
  }

  async removeFavoriteProductService(userId: string, productId: string) {
    return await this.usersRepository.removeFavoriteProductRepository(userId, productId)
  }

  async claimProductService(userId: string, productId: string) {
    const { product, user } = await this.usersRepository.claimProductRepository(userId, productId)

    const gameToken = this.generateRandomToken(10)

    await this.notificationsService.sendEmailService(
      user.email,
      'Product claimed successfully',
      'email/product-claimed-notification',
      { name: user.name, product, gameToken }
    )

    return product
  }
}

