import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/guards/auth.guards";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.usersService.getUsers(Number(page) || 1,Number(limit) || 5);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUsesrById(@Param("id") id: string) {
    return this.usersService.getUsersById(String(id));
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id") id: string, @Body() data: CreateUserDto) {
    return this.usersService.updateUser(String(id), data);
  } 

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(String(id));
  }
}