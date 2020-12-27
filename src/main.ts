import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async() => {
  const app: INestApplication = await NestFactory.create(AppModule);
  const PORT = 8080;
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  await app.listen(PORT);
}

bootstrap();