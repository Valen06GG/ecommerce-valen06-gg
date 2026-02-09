import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "../products/products.entity";

@Injectable()
export class FilesRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async updateProductImage(productId: string, imageUrl: string) {
    await this.productsRepo.update(productId, {
      imgUrl: imageUrl,
    });

    return this.productsRepo.findOne({
      where: { id: productId },
    });
  }
}