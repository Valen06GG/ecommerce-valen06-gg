import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getById(id: string) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async signUp(userData: Partial<User>) {
    const newUser = this.repo.create(userData);
    return this.repo.save(newUser);
  }

  async updateUser(id: string, data: Partial<User>) {
    const user = await this.getById(id);
    if (!user) return null;

    Object.assign(user, data);
    return this.repo.save(user);
  }

  async deleteUser(id: string) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }

  async getUserByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
    });
  }
}