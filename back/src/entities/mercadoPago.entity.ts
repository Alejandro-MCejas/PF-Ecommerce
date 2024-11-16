import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity({ name: 'mercadoPago' })
export class mercadoPago {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    pagoStatus: string;

    @Column({ type: 'varchar', length: 255 })
    pagoId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    externalReference: string;

    @ManyToOne(() => Orders, (order) => order.mercadoPago)
    @JoinColumn({ name: 'orderId' })
    order: Orders;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
