import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '@common/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Microservice Example')
    .setDescription('Microservice Example Api')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.app.port);
}
bootstrap();
