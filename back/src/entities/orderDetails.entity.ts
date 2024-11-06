import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Orders } from "./orders.entity";


@Entity({name: 'orderDetails'})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number

    @OneToOne(() => Orders, order => order.orderDetails)
    @JoinColumn()
    order: Orders

    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[]
}

