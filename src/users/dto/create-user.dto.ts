import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
        description: "El email del usuario debe ser un email valido",
        example: "example@gmail.com"
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
        description: "El nombre del usuario debe tener como minimo 3 caracteres",
        example: "Valentin"
  })
  name: string;

  /**
  * La contraseña, debe ser una contraseña dificil de encontrar
  * @example Strong!(Password)
  */
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      "Password must contain uppercase, lowercase, number and special character (!@#$%^&*)"
  })
  // @ApiProperty({
    //     description: "La contraseña del usuario debe ser una contraseña dificil de encontrar",
    //     example: "Strong!(Password)"
  // })
  password: string;

  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description: "tu direccion",
    example: "Ej: Calle falsa 1234"
  })
  address: string;

  @IsEmpty()
  @ApiProperty({
        description: "Asignada por default al momento de crear el usuario no debe ser incluida en el body",
        default: false
    })
  isAdmin: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: "asegurate de que el numero de telefono sea tuyo",
    example: "1123456789"
  })
  phone: number;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  @ApiProperty({
    description: "pais en el que naciste",
    example: "Ej: Aregentina"
  })
  country?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  @ApiProperty({
    description: "tu ciudad",
    example: "Ej: Buenos Aires"
  })
  city: string;
}