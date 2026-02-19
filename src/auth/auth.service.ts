import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/roles.enum";


@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
      private readonly jwtService: JwtService
    ) {}
    getAuth() {
        return "Get all Auth";
    }

    async signIn(email: string, password: string) {
        const dbUser = await this.usersRepository.getUserByEmail(email);
        if(!dbUser) {
            throw new BadRequestException("User not found");
        }
        const isPaswordValid = await bcrypt.compare(password, dbUser.password);
        if(!isPaswordValid) {
            throw new BadRequestException("Invalid Password");
        }

        const userPayload = { 
            sub: dbUser.id,
            id: dbUser.id, 
            email: dbUser.email,
            roles: [ dbUser.isAdmin ? Role.Admin : Role.User ],
        };

        const token = await this.jwtService.sign(userPayload);


        return { succes: "User logged in succesfully!", token };
    }

    
    async signUp(dto: SignUpDto) {
    const {
      confirmPassword,
      password,
      ...userData
    } = dto;

    if (password !== confirmPassword) {
      throw new BadRequestException(
        "Las contraseñas no coinciden",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const user = await this.usersRepository.signUp({
      ...userData,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPass } =
      user;

    return userWithoutPass;
  }
}