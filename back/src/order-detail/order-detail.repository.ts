import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Repository } from "typeorm";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";




@Injectable()
export class OrderDetailRepository {
    constructor(@InjectRepository(OrderDetails) private readonly orderDetailRepository: Repository<OrderDetails>) { }

    async findAllOrderDetailsRepository() {
        return await this.orderDetailRepository.find();
    }

    async findOneOrderDetailRepository(id: string) {
        const orderDetail = await this.orderDetailRepository.findOne({
            where: { order: { id } },
            relations: ['products']
        })

        return orderDetail
    }

    async createOrderDetailRepository(orderDetail: CreateOrderDetailDto) {
        return await this.orderDetailRepository.save(
            this.orderDetailRepository.create(orderDetail)
        )
    }

    async updateOrderDetailRepository(id: string, orderDetail: UpdateOrderDetailDto) {
        return await this.orderDetailRepository.update(id, orderDetail);
    }

    async deleteOrderDetailRepository(id: string) {
        return await this.orderDetailRepository.delete(id);
    }
}