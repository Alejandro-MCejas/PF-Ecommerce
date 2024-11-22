import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity({name: 'reviews'})
export class Reviews{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    rating: number;

    @Column()
    comment:string;

    @ManyToOne(()=> Users, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user:Users;

    @ManyToOne(() => Products, (products) => products.reviews)
    @JoinColumn({ name: 'product_id' })
    products:Products;
}