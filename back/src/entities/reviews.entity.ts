import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity({name: 'reviews'})
export class Reviews{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    rating: number;

    @Column()
    coment:string;

    @OneToMany(()=> Users, (user) => user.reviews)
    user:Users;

    @ManyToOne(() => Products, (products) => products.reviews)
    products:Products;
}