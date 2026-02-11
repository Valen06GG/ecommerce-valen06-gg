import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { AuthGuard } from "src/auth/guards/auth.guards";

@Controller("orders")
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    @UseGuards(AuthGuard)   
    addOrder(@Body() body: CreateOrderDto) {
      return this.ordersService.addOrder(body.userId,body.product);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getOrder(@Param("id", new ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id);
    }
}