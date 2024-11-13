import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity({name: 'categories'})
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name:string

    @ManyToMany(() => Products, product => product.categories)
    products: Products[]
}