import { Order } from "src/orders/orders.entity";
import { Products } from "src/products/products.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({
    name: "orderDetails"
})
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    })
    price: number

    @OneToOne(() => Order, (order) => order.orderDetail)
    order: Order;

    @ManyToMany(() => Products)
    @JoinTable()
    product: Products[];
}