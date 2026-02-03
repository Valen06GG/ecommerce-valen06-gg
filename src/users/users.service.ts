import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getUsers() {
        const users = await this.usersRepository.getUsers();
        return users.map(({ password, ...user }) => user);
    }

    async getUsersById(id: number) {
      const user = await this.usersRepository.getById(id);
      if (!user) return null;
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    async createUser(user: Omit<User, "id">): Promise<User> {
      return this.usersRepository.createUser(user);
    }

    async updateUser(id: number, data: Partial<User>) {
        const updated = this.usersRepository.updateUser(id, data);
        if(!updated) {
            return { message: "Usuario no encontrado" };
        } 
        return "Usuario editado exitosamente";
    }

    deleteUser(id: number) {
      const deleted = this.usersRepository.deleteUser(id);
      if(!deleted) {
        return { message: "Usuario no encontrado" };
      };
      return "Usuario eliminado exitosamente";
    }
}