import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/loginUser.dto";
import { SignUpDto } from "./dto/signup.dto";
import { UserCredentialsDto } from "./dto/usersCredentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post("signin")
  async signIn( @Body() user: UserCredentialsDto ) {
    return this.authService.signIn( user.email, user.password);
  }

  @Post("signup")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}