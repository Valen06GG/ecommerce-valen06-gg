import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
