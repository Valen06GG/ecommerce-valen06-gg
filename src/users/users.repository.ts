import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
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
}