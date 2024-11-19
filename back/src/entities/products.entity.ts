import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Categories } from "./categories.entity";
import { Reviews } from "./reviews.entity";
import { Suscription } from "./suscription.entity";



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
    
    @Column({default: false})
    suscription:boolean;

    @OneToMany(() => Suscription, (subscription) => subscription.product)
    suscriptions: Suscription[];

    @ManyToMany(()=> Categories, (categories) => categories.products )
    @JoinTable()
    categories: Categories[];

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails;

    @OneToMany(() => Reviews, (reviews) => reviews.products)
    reviews: Reviews;
}
