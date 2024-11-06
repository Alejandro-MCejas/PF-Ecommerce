import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
// import { OrderDetails } from "./orderDetails.entity";

@Entity({name:'products'})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price:number;

    @Column('int')
    stock: number;

    // @Column()
    // suscription:boolean;

    // @ManyToOne(()=> Categories, (categories) => categories.products )
    // categories: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails;
}
