import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getAuth() {
        return "Get all Auth";
    }

    async singIn(email: string, password: string) {
        if(!email || !password) { 
            return "Se requiere email y password";
        };
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if(!foundUser || foundUser.password !== password) {
            return "Email o password incorrectos";
        }
        return "Usuario logueado (Token)";
    }
}