import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";

@Entity({name:'products'})
export class Products {
    @PrimaryColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    price:number;

    @Column()
    stock: number;

    // @ManyToOne(()=> Categories, (categories) => categories.products )
    // categories: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails;
}
