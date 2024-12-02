import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Products } from "src/entities/products.entity";


@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>,
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>
    ) { }

    async findUsersRepository() {
        return await this.usersRepository.find({
            select: ['id', 'name', 'email', 'address', 'phone', 'admin', 'isSuscription']
        })
    }

    async createUserRepository(user: CreateUserDto) {
        const newUser = await this.usersRepository.save(
            this.usersRepository.create(user)
        )
        return newUser
    }


    async findOneUserRepository(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'address', 'phone', 'isSuscription',],
            relations: ['orders']
        })


        return user
    }

    async updateUserRepository(id: string, user: UpdateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { id } })

        if (!existingUser) {
            return null
        }

        Object.assign(existingUser, user)

        await this.usersRepository.save(existingUser)

        return existingUser
    }

    async deleteUserRepository(id: string) {
        const userToDelete = await this.usersRepository.findOne({ where: { id } })
        await this.usersRepository.delete(id)
        return userToDelete
    }

    async findUserByEmailRepository(email: string) {
        return await this.usersRepository.findOne({ where: { email } })
    }

    async findUserByEmailOrSubRepository(email: string, sub: string) {
        return await this.usersRepository.findOne({
            where: [{ email }, { sub }],
        });
    }

    async updateUserSubRepository(userId: string, sub: string) {
        await this.usersRepository.update(userId, { sub });
    }

    async findAllFavoritesProductsRepository(userId: string) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['favoriteProducts'],
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user.favoriteProducts
    }

    async addFavoriteProductRepository(userId: string, productId: string) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['favoriteProducts'],
        })

        if (!user) throw new Error('User not found');

        const product = await this.productsRepository.findOne({
            where: { id: productId },
        })

        if (!product) throw new Error('Product not found');

        user.favoriteProducts.push(product);
        await this.usersRepository.save(user)
        return product

    }

    async removeFavoriteProductRepository(userId: string, productId: string) { 
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['favoriteProducts'],
        })

        if(!user) throw new Error('User not found');

        const product = await this.productsRepository.findOne({
            where: { id: productId },
        })

        if(!product) throw new Error('Product not found');

        user.favoriteProducts = user.favoriteProducts.filter(product => product.id !== productId)
        await this.usersRepository.save(user)
        return product
    }
}




