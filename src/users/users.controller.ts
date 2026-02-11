import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
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
  getUsesrById(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.getUsersById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: CreateUserDto) {
    return this.usersService.updateUser(id, data);
  } 

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}