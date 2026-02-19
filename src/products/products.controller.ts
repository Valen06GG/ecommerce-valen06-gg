import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesGuard } from "src/auth/guards/roles.guards";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles.enum";

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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateProduct(id, data);
  } 
  
  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteProduct(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.deleteProduct(id);
  }
  
  @Get(":id")
  getProductsById(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.getProductsById(id);
  }
}