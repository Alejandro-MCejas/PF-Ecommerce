import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";


@Injectable()
export class OrdersRepository {
    constructor(@InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>) { }
    
    async findAllOrdersRepository() {
        return await this.ordersRepository.find()
    }
    
    async findOneOrderRepository(id: string) {
        return await this.ordersRepository.findOne({ where: { id } })
    }

    async createOrderRepository(order: CreateOrderDto) {
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