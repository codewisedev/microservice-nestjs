import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '@common/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* This code is creating a gRPC microservice using the `createMicroservice` method provided by the
  `@nestjs/core` package. The `createMicroservice` method takes two arguments: the first argument is
  the `AppModule` class, which is the root module of the NestJS application, and the second argument
  is an object that contains the configuration options for the microservice. */
  const microserviceGrpc =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: `${Config.app.grpcHost}:${Config.app.port}`,
        package: 'user',
        protoPath: join(Config.app.PWD, 'proto/user.proto'),
      },
    });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));

  /* This code is creating a Swagger documentation configuration object using the `DocumentBuilder`
  class provided by the `@nestjs/swagger` package. It sets the title, description, version, and tag
  of the documentation, and also adds a bearer authentication option. The `build()` method is then
  called to generate the final configuration object. This object is later used to generate and set
  up Swagger documentation for the NestJS application. */
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Microservice Example')
    .setDescription('Microservice Rest Api')
    .setVersion('1.0')
    .addTag('Microservice')
    .build();

  /* This code is generating and setting up Swagger documentation for the NestJS application. */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.app.port);
}
bootstrap();
