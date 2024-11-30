import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { OrderDetailService } from 'src/order-detail/order-detail.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly orderDetailService: OrderDetailService
  ) { }

  async findAllOrdersService() {
    return await this.ordersRepository.findAllOrdersRepository();
  }

  async findOneOrderService(id: string) {
    const order = await this.ordersRepository.findOneOrderRepository(id)

    if (!order) {
      throw new Error('La orden no existe')
    }

    const orderDetail = await this.orderDetailService.findOneOrderDetailService(order.id)

    const orderResponse = {
      order,
      orderDetail: orderDetail.products
    }

    return orderResponse
  }



  async createOrderService(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto
    const user = await this.usersService.findOneUserService(userId)

    const productsWithStock = await this.productsService.getProductsWithStock(products)

    if (productsWithStock.length === 0) {
      throw new Error('No hay stock en ninguno de los productos recibidos')
    }

    if (productsWithStock.length < products.length) {
      throw new Error('No hay stock en algunos de los productos recibidos')
    }

    const structureOfOrder = {
      user,
      products: productsWithStock
    }

    const newOrder = await this.ordersRepository.createOrderRepository(structureOfOrder)

    if (!newOrder) {
      throw new Error('La orden no pudo ser creada')
    }


    for (const product of productsWithStock) {
      await this.productsService.reduceProductStockService(product.id)
    }

    const total = await this.calculateTotal(productsWithStock)


    const orderDetail = new CreateOrderDetailDto()
    orderDetail.price = total
    orderDetail.order = newOrder
    orderDetail.products = productsWithStock

    const newOrderDetail = await this.orderDetailService.createOrderDetailService(orderDetail)

    const orderResponse = {
      order: {
        id: newOrder.id,
        date: newOrder.date,
        user: newOrder.user
      },
      price: newOrderDetail.price,
      orderDetailId: newOrderDetail.id
    }

    return orderResponse
  }

  async deleteOrderService(id: string) {
    return await this.ordersRepository.deleteOrderRepository(id);
  }

  private async calculateTotal(products: Array<{ id: string, price: number, stock: number }>) {
    let total: number = 0;
    for (const product of products) {
      total += Number(product.price)

    }

    return total
  }

  async changeOrderStatus(orderId: string): Promise<any> {
    const order = await this.ordersRepository.findOneOrderRepository(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    const currentStatus = order.status;
    const statuses = Object.values(OrderStatus);
    const currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === statuses.length - 1) {
      throw new BadRequestException(
        `Cannot change status for order ${orderId}. Current status: ${currentStatus}`
      );
    }

    const nextStatus = statuses[currentIndex + 1];
    order.status = nextStatus;

    // Usar el nuevo método saveOrder para guardar los cambios
    await this.ordersRepository.saveOrder(order);

    return { message: `Order status updated to ${nextStatus}`, order };
  }


}
