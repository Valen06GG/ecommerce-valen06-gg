import { Type } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      "Password must contain uppercase, lowercase, number and special character (!@#$%^&*)"
  })
  password: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsEmpty()
  isAdmin: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  city: string;
}