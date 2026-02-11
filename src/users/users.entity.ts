import { Order } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({
    name: "users",
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
      type: "varchar",
      length: 50,
      nullable: false,
    })
    name: string

    @Column({
      type: "varchar",
      length: 50,
      nullable: false,
    })
    email: string

    @Column({
      type: "varchar",
      nullable: false,
    })
    password: string

    @Column({
      type: "int",
      nullable: false,
    })
    phone: number

    @Column({
      type: "varchar",
      length: 50,
    })
    country?: string

    @Column({
        type: "text",
    })
    address: string

    @Column({
      type: "varchar",
      length: 20,
    })
    city: string 

    @OneToMany(() => Order, (order) => order.user)
    orders?: Order[]; 
}  