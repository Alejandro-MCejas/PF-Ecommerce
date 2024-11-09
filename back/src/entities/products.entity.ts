import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Categories } from "./categories.entity";


@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:200})
    name: string;

    @Column('text', { array: true,  nullable: false  })
    image: string[]| string;

    @Column({type:'varchar', length:200})
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('int')
    stock: number;

    // @Column()
    // suscription:boolean;

    @ManyToOne(()=> Categories, (categories) => categories.products )
    categories: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails;
}
