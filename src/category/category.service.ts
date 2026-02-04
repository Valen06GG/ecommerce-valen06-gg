import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repositoy";

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async seed() {
        const categories = ["smartphone", "monitor", "keyboard", "mouse"];

        for(const name of categories) {
            await this.categoryRepository.addCategories(name);
        }

        return "Categories seeded";
    }
}