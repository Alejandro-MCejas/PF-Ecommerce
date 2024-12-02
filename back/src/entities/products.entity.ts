import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { OrderDetails } from "./orderDetails.entity";
import { Categories } from "./categories.entity";
import { Reviews } from "./reviews.entity";
import { Suscription } from "./suscription.entity";
import { OrderProduct } from './orderProduct.entity';



@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column('text', { array: true, nullable: false })
    image: string[] | string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    discount: number;

    @Column({ nullable: true })
    discountStartDate: Date; // Fecha de inicio del descuento

    @Column({ nullable: true })
    discountEndDate: Date;

    @Column('int')
    stock: number;

    @Column({ default: false })
    suscription: boolean;

    @OneToMany(() => Suscription, (subscription) => subscription.product)
    suscriptions: Suscription[];

    @ManyToMany(() => Categories, (categories) => categories.products)
    @JoinTable()
    categories: Categories[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];

    @OneToMany(() => Reviews, (reviews) => reviews.products)
    reviews: Reviews[];

    @Column({ default: false })
    isFeatured: boolean;
}
