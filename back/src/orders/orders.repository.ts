import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Repository } from "typeorm";
import { Users } from "src/entities/users.entity";
import { ProductIdAndQuantity } from "./dto/create-order.dto";


@Injectable()
export class OrdersRepository {
    constructor(@InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>) { }

    async findAllOrdersRepository() {
        return await this.ordersRepository.find()
    }

    async findOneOrderRepository(id: string) {
        return await this.ordersRepository.findOne({
            where: { id },
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    phone: true,
                    isSuscription: true,
                    admin: true,
                },
            }
        })
    }

    async createOrderRepository(order: { user: Users, products: Array<ProductIdAndQuantity> }) {
        const newOrderToCreate = {
            ...order,
            date: new Date().toLocaleString()
        }

        return await this.ordersRepository.save(
            this.ordersRepository.create(newOrderToCreate)
        )
    }

    async deleteOrderRepository(id: string) {
        return await this.ordersRepository.delete(id)
    }
}