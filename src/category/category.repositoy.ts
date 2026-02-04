import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository {
    constructor(@InjectRepository(Category)
    private repo: Repository<Category>
    ) {}
   
     findOne(options) {
       return this.repo.findOne(options);
     }
   
     save(data) {
       return this.repo.save(data);
     }

    async getCategories() {
      return this.repo.find();
    }

    async addCategories(name: string) {
      const exists = await this.repo.findOne({
        where: { name },
      });

      if (!exists) {
        const category = this.repo.create({ name });
        await this.repo.save(category);
      }
    }
}