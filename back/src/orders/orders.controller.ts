import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAllOrdersController(@Res() res: Response) {
    const orders = await this.ordersService.findAllOrdersService();
    return res.status(200).json(orders);
  }

  @Get(':id')
  async findOneOrderController(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.findOneOrderService(id); 
    return res.status(200).json(order);
  }

  @Post()
  async createOrderController(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const newOrder = await this.ordersService.createOrderService(createOrderDto); 
    return res.status(201).json(newOrder);
  }

  @Delete(':id')
  async deleteOrderController(@Param('id') id: string, @Res() res: Response) {
    const deletedOrder = await this.ordersService.deleteOrderService(id);
    return res.status(200).json(deletedOrder);
  }
}
