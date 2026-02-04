import { Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post("seeder")
    seed() {
        return this.categoryService.seed();
    }
}
