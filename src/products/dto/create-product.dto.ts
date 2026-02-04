import { IsString, IsNumber, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  stock: number;

  @IsString()
  imgUrl: string;
}