import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRespository } from "./products.repository";

@Module({
    providers: [ProductsService, ProductsRespository],
    controllers: [ProductsController],
})
export class ProductsModule {}