import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { Response } from 'express';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async findAllOrderDetailsController(@Res() res: Response) {
    const orderDetails = await this.orderDetailService.findAllOrderDetailsService();
    return res.status(200).json(orderDetails);
  }

  @Get(':id')
  async findOneOrderDetailController(@Param('id') id: string, @Res() res: Response) {
    const orderDetail = await this.orderDetailService.findOneOrderDetailService(id);
    return res.status(200).json(orderDetail);
  }

  @Post()
  async createOrderDetailController(@Body() createOrderDetailDto: CreateOrderDetailDto, @Res() res: Response) {
    const newOrderDetail = await this.orderDetailService.createOrderDetailService(createOrderDetailDto);
    return res.status(201).json(newOrderDetail);
  }

  @Put(':id')
  async updateOrderDetailController(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto, @Res() res: Response) {
    const updatedOrderDetail = await this.orderDetailService.updateOrderDetailService(id, updateOrderDetailDto);
    return res.status(200).json(updatedOrderDetail);
  }

  @Delete(':id')
  async deleteOrderDetailController(@Param('id') id: string, @Res() res: Response) {
    const deletedOrderDetail = await this.orderDetailService.deleteOrderDetailService(id);
    return res.status(200).json(deletedOrderDetail);
  }
}
