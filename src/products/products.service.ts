import { Injectable } from "@nestjs/common";
import { ProductsRespository } from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRespository) {}

    getProducts() {
        return this.productsRepository.getProducts();
    }
}