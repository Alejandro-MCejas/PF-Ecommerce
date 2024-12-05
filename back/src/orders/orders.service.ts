import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly orderDetailService: OrderDetailService
  ) {}

  async findAllOrdersService() {
    return await this.ordersRepository.findAllOrdersRepository();
  }

  async findOneOrderService(id: string) {
    const order = await this.ordersRepository.findOneOrderRepository(id);
  
    if (!order) {
      throw new Error('The order does not exist');
    }
  
    const orderDetail = await this.orderDetailService.findOneOrderDetailService(order.id);
  
    if (!orderDetail) {
      throw new Error('No order detail associated with this order was found');
    }
  
    const formattedProducts = orderDetail.orderProducts.map(op => ({
      productId: op.product.id,
      productName: op.product.name,
      quantity: op.quantity,
    }));
  
    const orderResponse = {
      order,
      orderDetail: {
        id: orderDetail.id,
        price: orderDetail.price,
        products: formattedProducts,
      },
    };
  
    return orderResponse;
  }
  
  

  async createOrderService(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.usersService.findOneUserService(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const productsWithStock = await this.productsService.getProductsWithStock(products);

    if (productsWithStock.length === 0) {
      throw new Error('There is no stock for any of the received products');
    }

    if (productsWithStock.length < products.length) {
      throw new Error('There is no stock for some of the received products');
    }

    const structureOfOrder = {
      user,
      products: productsWithStock,
    };

    const newOrder = await this.ordersRepository.createOrderRepository(structureOfOrder);

    if (!newOrder) {
      throw new Error('The order could not be created');
    }

    for (const { id, quantity } of productsWithStock) {
      await this.productsService.reduceProductStockService(id, quantity);
    }

    const total = await this.calculateTotal(productsWithStock);

    const orderDetail = await this.orderDetailService.createOrderDetailService({
      price: total,
      orderId: newOrder.id,
      products: productsWithStock.map(({ id, quantity }) => ({ productId: id, quantity })),
    });

    const orderResponse = {
      order: {
        id: newOrder.id,
        date: newOrder.date,
        user: newOrder.user,
      },
      price: orderDetail.price,
      orderDetailId: orderDetail.id,
    };

    return orderResponse;
  }

  async deleteOrderService(id: string) {
    return await this.ordersRepository.deleteOrderRepository(id);
  }

  private async calculateTotal(products: Array<{ id: string; price: number; quantity: number }>) {
    let total: number = 0;
    for (const product of products) {
      total += product.price * product.quantity; // Multiplicamos el precio por la cantidad
    }

    return total;
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
        `Cannot change status for order ${orderId}. Current status: ${currentStatus}`,
      );
    }

    const nextStatus = statuses[currentIndex + 1];
    order.status = nextStatus;

    // Usar el nuevo método saveOrder para guardar los cambios
    await this.ordersRepository.saveOrder(order);

    return { message: `Order status updated to ${nextStatus}`, order };
  }
}
