import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from "./config/auth0.config"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const swaggerConfig = new DocumentBuilder()
                            .setTitle("Demo-nest")
                            .setDescription("Esta es una Api construida con Nest para ser empleada en las demos del modulo 4 de la especialidad back-end de la carrera Fullstack Developer de Henry")
                            .setVersion("1.0")
                            .addBearerAuth()
                            .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
