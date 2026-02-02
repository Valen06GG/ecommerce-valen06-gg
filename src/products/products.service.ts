import { Injectable } from "@nestjs/common";
import { ProductsRespository } from "./products.repository";
import { Product } from "./product.interface";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRespository) {}

    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }

    getProductsById(id: number) {
      return this.productsRepository.getById(id);
    }

    createProduct(product: Omit<Product, "id">): Product {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: number, data: Partial<Product>) {
      const updated = this.productsRepository.updateProduct(id, data);
      if (!updated) {
        return { message: "Producto no encontrado" };
      }
      return "Producto editado exitosamente";
    }

    deleteProduct(id: number) {
      const deleted = this.productsRepository.deleteProduct(id);
      if(!deleted) {
        return { message: "Producto no encontrado" };
      };
      return "Producto eliminado exitosamente";
    }
}