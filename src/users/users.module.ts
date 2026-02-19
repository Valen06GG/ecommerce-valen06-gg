import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { requiresAuth } from "express-openid-connect";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersRepository],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users');
        consumer.apply(requiresAuth()).forRoutes("users/auth0/protected")
    }
    
}