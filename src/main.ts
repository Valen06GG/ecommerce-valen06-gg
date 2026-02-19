import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from "./config/auth0.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
