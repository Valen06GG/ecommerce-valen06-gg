import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository {
    private users: User[] = [
    {
      id: 1,
      email: "juan.perez@mail.com",
      name: "Juan Pérez",
      password: "123456",
      address: "Av. Siempre Viva 742",
      phone: "+54 11 1234-5678",
      country: "Argentina",
      city: "Buenos Aires",
    },
    {
      id: 2,
      email: "maria.gomez@mail.com",
      name: "María Gómez",
      password: "password123",
      address: "Calle Falsa 123",
      phone: "+54 11 8765-4321",
      country: "Argentina",
      city: "Córdoba",
    },
    {
      id: 3,
      email: "carlos.lopez@mail.com",
      name: "Carlos López",
      password: "qwerty",
      address: "San Martín 456",
      phone: "+54 261 555-0000",
      country: "Argentina",
      city: "Santa Cruz"
    },
    ];

    async getUsers() {
        return this.users;
    }

    async getById(id: number) {
        return this.users.find((user) => user.id === id);
    }

    async createUser(user: Omit<User, "id">): Promise<User> {
        const id = this.users.length + 1;
        this.users = [...this.users, { id, ...user }];
        return { id, ...user };
    }

    updateUser(id: number, data: Partial<User>) {
        const user = this.users.findIndex(user => user.id === id);
        if(user === -1) {
          return null;
        }
        this.users[user] = {
          ...this.users[user],
          ...data,
        };
        return this.users[user];
    }

    deleteUser(id: number) {
        const delUser = this.users.findIndex(user => user.id === id);
        if(delUser === -1) {
          return false
        };
        this.users.splice(delUser, 1);
        return true;
    }
}