import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { In, Repository } from "typeorm";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/users.entity";
import { Products } from "src/products/products.entity";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,

        @InjectRepository(OrderDetail)
        private detailRepo: Repository<OrderDetail>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Products)
        private productRepo: Repository<Products>,
    ) {}

    async getOrder(id: string) {
      return this.orderRepo.findOne({
        where: { id },
        relations: {
          user: true,
          orderDetail: {
            products: true,
          },
        },
      });
    }

    async addOrder(userId: string, products: { id: string }[]) {
      const user = await this.userRepo.findOne({
        where: { id: userId },
      });

      if (!user) throw new Error("Usuario no encontrado");

      const ids = products.map(p => p.id);

      const foundProducts = await this.productRepo.find({
        where: {
            id: In(ids),
        },
      });

      const available = foundProducts.filter(p => p.stock > 0);

      if(!available.length)
        throw new Error("Sin stock");

      let total = 0;

      for (const product of available) {
        total += Number(product.price);
        product.stock -= 1;
        await this.productRepo.save(product);
      }

      const detail = this.detailRepo.create({
        products: available,
        price: total,
      });

      await this.detailRepo.save(detail);

      const order = this.orderRepo.create({
      user,
      orderDetail: detail,
      date: new Date(),
    });

    await this.orderRepo.save(order);

    return {
        orderId: order.id,
        detailId: detail.id,
        total,
    };
    }
}