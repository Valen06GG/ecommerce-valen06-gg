import { Type } from "class-transformer";
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  Length,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      "Password must contain uppercase, lowercase, number and special character (!@#$%^&*)"
  })
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city: string;
}
