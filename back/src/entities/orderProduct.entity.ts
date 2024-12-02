import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderDetails.entity';
import { Products } from './products.entity';

@Entity({ name: 'order_products' })
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderDetails, orderDetail => orderDetail.orderProducts, { onDelete: 'CASCADE' })
  orderDetail: OrderDetails;

  @ManyToOne(() => Products, product => product.orderProducts, { onDelete: 'CASCADE' })
  product: Products;

  @Column()
  quantity: number;
}
