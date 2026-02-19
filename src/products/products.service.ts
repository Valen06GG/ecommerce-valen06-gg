import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "./products.entity";
import { Category } from "../category/category.entity";
import productsData from "../data/products.json";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepo: Repository<Products>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async getProducts(page: number = 1, limit: number = 5) {
    return this.productRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["category"],
    });
  }
  
  async getProductsById(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: ["category"],
    });
  }

  async createProduct(data: Partial<Products>) {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  async updateProduct(id: string, data: Partial<Products>) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      return { message: "Producto no encontrado" };
    }

    Object.assign(product, data);
    await this.productRepo.save(product);

    return { id };
  }

  async deleteProduct(id: string) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      return { message: "Producto no encontrado" };
    }

    await this.productRepo.remove(product);

    return { id };
  }

  async seedProducts() {
    for (const prod of productsData) {

      const exists = await this.productRepo.findOne({
        where: { name: prod.name },
      });

      if (exists) continue;

      const category = await this.categoryRepo.findOne({
        where: { name: prod.category },
      });

      if (!category) continue;

      const newProduct = this.productRepo.create({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        imgUrl: "default.jpg",
        category,
      });

      await this.productRepo.save(newProduct);
    }

    return "Products seeded";
  }
}