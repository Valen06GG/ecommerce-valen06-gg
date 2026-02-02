import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(":id")
  getUsesrById() {
  }

  @Post()
  createUser() {
  }

  @Put(":id")
  updateUser() {
  } 

  @Delete(":id")
  deleteUser() {
  }
}