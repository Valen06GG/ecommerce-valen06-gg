import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message:
          "invalid email or password"
      })
      password: string;
}