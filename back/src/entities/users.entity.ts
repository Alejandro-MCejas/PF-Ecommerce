import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Orders } from './orders.entity'
import { UserRole } from 'src/users/enum/role.enum'
import { Reviews } from './reviews.entity'
import { Suscription } from './suscription.entity'
import { Products } from './products.entity'



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

    @Column({ type: 'text', nullable: true })
    address: string

    @Column({ type: 'varchar', nullable: true })
    phone: string

    @Column({ default: false, nullable: true })
    isSuscription: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    admin: UserRole

    @OneToMany(() => Suscription, (suscriptions) => suscriptions.user)
    suscriptions: Suscription[];

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[]

    @OneToMany(() => Reviews, (reviews) => reviews.user)
    reviews: Reviews;

    @Column({ unique: true, nullable: true })
    sub: string;

    @ManyToMany(() => Products, product => product.favoriteByUsers)
    @JoinTable()
    favoriteProducts: Products[]
}