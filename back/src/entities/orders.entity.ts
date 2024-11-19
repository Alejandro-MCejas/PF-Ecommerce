import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Users } from "./users.entity";
import { mercadoPago } from "./mercadoPago.entity";



@Entity({name: 'orders'})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    date: Date

    @ManyToOne(() => Users, user => user.orders)
    user: Users

    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    orderDetails: OrderDetails

    @OneToMany(() => mercadoPago, payment => payment.order)
    mercadoPago: mercadoPago[]; 
}
