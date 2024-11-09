import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";




@Entity({name: 'categories'})
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name:string

    @OneToMany(() => Products, product => product.categories)
    products: Products[]
}