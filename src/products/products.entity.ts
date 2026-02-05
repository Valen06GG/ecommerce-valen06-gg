import { Category } from "src/category/category.entity";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({
    name: "products",
})
export class Products {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
      type: "varchar",
      length: 50,
      nullable: false,
    })
    name: string

    @Column({
      type: "text",
      nullable: false,
    })
    description: string

    @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    })
    price: number

    @Column({
      nullable: false
    })
    stock: number

    @Column({
    default: "https://via.placeholder.com/150"
    })
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}