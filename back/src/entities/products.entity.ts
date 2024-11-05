import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    // @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    // orderDetails: OrderDetails;
}
