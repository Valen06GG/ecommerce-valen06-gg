import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { User } from "./user.interface";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(":id")
  getUsesrById(@Param("id") id: string) {
    return this.usersService.getUsersById(Number(id));
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() data: CreateUserDto) {
    return this.usersService.updateUser(Number(id), data);
  } 

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}