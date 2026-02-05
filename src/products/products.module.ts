import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/category.entity";
import { Products } from "./products.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Products])
    ],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
})
export class ProductsModule {}