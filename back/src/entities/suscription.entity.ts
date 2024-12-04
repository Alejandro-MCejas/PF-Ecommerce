import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity({name: 'suscription'})
export class Suscription{
    @PrimaryGeneratedColumn("uuid")
    id: string; 

    @Column("simple-array")
    productIds: string[]; 

    @Column({default: 'Basic'})
    type: string; 

    @Column("decimal")
    price: number = 10; 

    @Column("date")
    startDate: Date; 

    @Column("date")
    endDate: Date;
    
    @Column({ nullable: true }) // Asegúrate de que puede ser nulo inicialmente
    paymentId: string;

    @Column({ default: 'active' }) // Valores posibles: 'active', 'cancelled'
    status: string;

    @ManyToOne(() => Users, (user) => user.suscriptions, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: Users;

    @ManyToOne(() => Products, (product) => product.suscriptions, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: Products;


}