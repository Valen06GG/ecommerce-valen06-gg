import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "./products.entity";
import productsData from "../data/products.json";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  async getProducts(page: number, limit: number) {
    return this.productsRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getById(id: string) {
    return this.productsRepo.findOne({
      where: { id },
    });
  }

  async createProduct(data: Partial<Products>) {
    const product = this.productsRepo.create(data);
    return this.productsRepo.save(product);
  }

  async updateProduct(id: string, data: Partial<Products>) {
    await this.productsRepo.update(id, data);
    return this.getById(id);
  }

  async deleteProduct(id: string) {
    const result = await this.productsRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async seedProducts() {
  for (const prod of productsData) {
    const exists = await this.productsRepo.findOne({
      where: { name: prod.name },
    });

    if (exists) continue;

    const newProduct = this.productsRepo.create({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      imgUrl: "default.jpg",
    });

    await this.productsRepo.save(newProduct);
  }

  return "Products seeded";
}
}