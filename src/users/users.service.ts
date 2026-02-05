import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.entity";
@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getUsers(page: number, limit: number) {
        const users = await this.usersRepository.getUsers(page, limit);
        return users.map(({ password, ...user }) => user);
    }

    async getUsersById(id: string) {
      const user = await this.usersRepository.getById(id);
      if (!user) return null;
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    async createUser(user: Omit<User, "id">): Promise<User> {
      return this.usersRepository.createUser(user);
    }

    async updateUser(id: string, data: Partial<User>) {
        const updated = this.usersRepository.updateUser(id, data);
        if(!updated) {
            return { message: "Usuario no encontrado" };
        } 
        return "Usuario editado exitosamente";
    }

    deleteUser(id: string) {
      const deleted = this.usersRepository.deleteUser(id);
      if(!deleted) {
        return { message: "Usuario no encontrado" };
      };
      return "Usuario eliminado exitosamente";
    }
}