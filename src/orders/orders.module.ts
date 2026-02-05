import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/users.entity";
import { Products } from "src/products/products.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderDetail,
            User,
            Products,
        ])
    ],
    providers: [OrdersService, OrdersRepository,],
    controllers: [OrdersController,],
}) 
export class OrdersModule {}