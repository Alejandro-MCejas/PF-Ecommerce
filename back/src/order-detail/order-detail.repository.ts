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

    async findOneOrderDetailRepository(orderId: string) {
        return await this.orderDetailRepository.findOne({
          where: { order: { id: orderId } },
          relations: ['orderProducts', 'orderProducts.product'], // Asegúrate de cargar las relaciones necesarias
        });
      }
      
    async createOrderDetailRepository(orderDetail: CreateOrderDetailDto) {
        // Crear instancias de la entidad intermedia `OrderProduct`
        const orderProducts = orderDetail.products.map(product => ({
            product: { id: product.productId }, // Relacionar con el producto existente
            quantity: product.quantity,
        }));
    
        // Crear el detalle del pedido con los productos relacionados
        const newOrderDetail = this.orderDetailRepository.create({
            price: orderDetail.price,
            order: { id: orderDetail.orderId }, // Relacionar con el pedido existente
            orderProducts, // Relación con la entidad intermedia
        });
    
        // Guardar el detalle del pedido con sus relaciones
        return await this.orderDetailRepository.save(newOrderDetail);
    }
    
    

    async updateOrderDetailRepository(id: string, orderDetail: UpdateOrderDetailDto) {
        // Desglosar los productos para adaptarlos al formato esperado por TypeORM
        const updatePayload = {
            ...orderDetail,
            products: orderDetail.products?.map(product => ({
                id: product.productId, // Solo pasar los IDs o propiedades esperadas
                quantity: product.quantity,
            })),
        };
    
        return await this.orderDetailRepository.update(id, updatePayload);
    }
    

    async deleteOrderDetailRepository(id: string) {
        return await this.orderDetailRepository.delete(id);
    }
}
