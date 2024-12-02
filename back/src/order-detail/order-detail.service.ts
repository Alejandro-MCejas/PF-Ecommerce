import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailRepository } from './order-detail.repository';

@Injectable()
export class OrderDetailService {
  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  async findAllOrderDetailsService() {
    return await this.orderDetailRepository.findAllOrderDetailsRepository();
  }

  async findOneOrderDetailService(orderId: string) {
    return await this.orderDetailRepository.findOneOrderDetailRepository(orderId);
  }
  

  async createOrderDetailService(createOrderDetailDto: CreateOrderDetailDto) {
    return await this.orderDetailRepository.createOrderDetailRepository(createOrderDetailDto);
  }

  async updateOrderDetailService(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    return await this.orderDetailRepository.updateOrderDetailRepository(id, updateOrderDetailDto);
  }

  async deleteOrderDetailService(id: string) {
    return await this.orderDetailRepository.deleteOrderDetailRepository(id);
  }
}
