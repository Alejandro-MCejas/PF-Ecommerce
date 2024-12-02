import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { OrderProduct } from './orderProduct.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @OneToOne(() => Orders, order => order.orderDetails, { cascade: true }) // Configurar cascade aquí
  @JoinColumn()
  order: Orders;
  
  @OneToMany(() => OrderProduct, orderProduct => orderProduct.orderDetail, { cascade: true })
  orderProducts: OrderProduct[];
}

