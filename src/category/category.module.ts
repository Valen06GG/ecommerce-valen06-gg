import { Module } from "@nestjs/common";
import { CategoryRepository } from "./category.repositoy";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Products } from "src/products/products.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Products])
    ],
    providers: [CategoryService, CategoryRepository,],
    controllers: [CategoryController,],
})
export class CategoryModule {}
