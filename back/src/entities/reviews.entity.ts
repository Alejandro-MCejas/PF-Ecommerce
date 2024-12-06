import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Products } from "./products.entity";
import { IsInt, IsOptional, Length } from "class-validator";

@Entity({name: 'reviews'})
export class Reviews{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @IsInt()
    @Length(1, 5)
    @Column({ nullable: true })
    @IsOptional()
    rating?: number;

    @Column({ nullable: true })
    @IsOptional()
    comment?:string;

    @ManyToOne(()=> Users, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user:Users;

    @ManyToOne(() => Products, (products) => products.reviews, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'product_id' })
    products:Products;
}