import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
import { RoleGuard } from 'src/auth/roleGuard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HybridAuthGuard } from 'src/auth/hybridAuthGuard.guard';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async findAllOrdersController(@Res() res: Response) {
    const orders = await this.ordersService.findAllOrdersService();
    return res.status(200).json(orders);
  }

  @Get(':id')
  @UseGuards(HybridAuthGuard)
  async findOneOrderController(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.findOneOrderService(id);
    return res.status(200).json(order);
  }

  @Post()
  @UseGuards(HybridAuthGuard)
  async createOrderController(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const newOrder = await this.ordersService.createOrderService(createOrderDto);
    return res.status(201).json(newOrder);
  }

  @Delete(':id')
  // @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteOrderController(@Param('id') id: string, @Res() res: Response) {
    const deletedOrder = await this.ordersService.deleteOrderService(id);
    return res.status(200).json(deletedOrder);
  }

  @Post("changeStatus")
  @HttpCode(HttpStatus.OK)
  @UseGuards(HybridAuthGuard)
  async changeStatus(@Body("orderId") orderId: string) {
    if (!orderId) {
      throw new BadRequestException("orderId is required.");
    }

    return this.ordersService.changeOrderStatus(orderId);
  }

}
