import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({
    name: "orders"
})
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    })
    date: Date

    @ManyToOne(() => User, (user) => user.orders_id)
    user: User;
    
    @OneToOne(() => OrderDetail)
    @JoinTable()
    orderDetail: OrderDetail;
}