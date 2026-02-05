import {
  IsUUID,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

class ProductRefDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateOrderDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductRefDto)
  product: ProductRefDto[];
}