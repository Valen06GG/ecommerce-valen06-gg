import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRespository {
    private products = [
    {
      id: 1,
      name: "Notebook Lenovo IdeaPad",
      description: "Notebook 15.6'' con procesador Intel i5 y 8GB de RAM",
      price: 850000,
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

    getProducts() {
        return this.products;
    }
}