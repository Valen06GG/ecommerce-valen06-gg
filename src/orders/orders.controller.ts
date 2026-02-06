import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    addOrder(@Body() body: CreateOrderDto) {
      return this.ordersService.addOrder(body.userId,body.product);
    }

    @Get(":id")
    getOrder(@Param("id", new ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id);
    }
}