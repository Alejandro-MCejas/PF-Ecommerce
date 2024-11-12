import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Orders } from './orders.entity'
import { UserRole } from 'src/users/enum/role.enum'



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

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    admin: UserRole

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[]
}