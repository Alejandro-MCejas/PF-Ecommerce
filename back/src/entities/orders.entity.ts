import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Users } from "./users.entity";



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

}
