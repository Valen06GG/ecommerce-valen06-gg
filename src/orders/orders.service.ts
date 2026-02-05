import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
    constructor(private orderRepo: OrdersRepository) {}

    getOrder(id: string) {
      return this.orderRepo.getOrder(id);
    }

    addOrder(dto: CreateOrderDto) {
      return this.orderRepo.addOrder(dto.userId, dto.product)
    }
}