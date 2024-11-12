import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Orders } from './orders.entity'
import { Reviews } from './reviews.entity'



@Entity({ name: 'users' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string
    
    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'varchar' })
    confirmPassword: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'varchar' })
    phone: string

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[]

    @ManyToOne(() => Reviews, (reviews)=> reviews.user)
    reviews:Reviews;
}