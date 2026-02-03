import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";

@Injectable()
export class ProductsRespository {
    private products = [
    {
      id: 1,
      name: "Notebook Lenovo IdeaPad",
      description: "Notebook 15.6'' con procesador Intel i5 y 8GB de RAM",
      price: 85000,
      stock: true,
      imgUrl: "https://spacegamer.com.ar/img/Public/1058/67507-producto-1.jpg",
    },
    {
      id: 2,
      name: "Mouse Logitech G203",
      description: "Mouse gamer RGB con sensor de alta precisión",
      price: 25000,
      stock: true,
      imgUrl: "https://www.newtree.com.ar/Temp/App_WebSite/App_PictureFiles/Items/097855157553_800.jpg",
    },
    {
      id: 3,
      name: "Teclado Mecánico Redragon",
      description: "Teclado mecánico RGB con switches blue",
      price: 45000,
      stock: false,
      imgUrl: "https://logg.api.cygnus.market/static/logg/Global/Redragon_Kumara_red_switch_spanish_K552RGB_1R_SP/312f1c6881e647f0a524cbb03477b03a.webp",
    },
    ];

    getProducts(page: number, limit: number) {
      const start = (page -1) * limit;
      const end = start + limit;
        return this.products.slice(start, end);
    }

    getById(id: number) {
        return this.products.find((product) => product.id === id);
    }

    createProduct(product: Omit<Product, "id">): Product {
      const id = this.products.length + 1;
      this.products = [...this.products, { id, ...product }];
      return { id, ...product };
    }

     updateProduct(id: number, data: Partial<Product>) {
        const product = this.products.findIndex(p => p.id === id);
        if (product === -1) {
          return null;
        }
        this.products[product] = {
          ...this.products[product],
          ...data,
        };
        return this.products[product];
      }

      deleteProduct(id: number) {
        const delProduct = this.products.findIndex(p => p.id ===id);
        if(delProduct === -1) {
          return false;
        }
        this.products.splice(delProduct, 1);
        return true
      }
}