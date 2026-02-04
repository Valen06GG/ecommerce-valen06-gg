import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/auth/guards/auth.guards";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  } 

  @Get()
  getProducts(@Query("page") page?: string, @Query("limit") limit?: string ) {
    return this.productsService.getProducts(Number(page) || 1,Number(limit) || 5);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Post("seeder")
  seed() {
    return this.productsService.seedProducts();
  }
  
  @Put(":id")
  @UseGuards(AuthGuard)
  updateProduct(@Param("id") id: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateProduct((id), data);
  } 
  
  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct((id));
  }
  
  @Get(":id")
  getProductsById(@Param("id") id: string) {
    return this.productsService.getProductsById((id))
  }
}