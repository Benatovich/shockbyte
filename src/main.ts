import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
// import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  app.setGlobalPrefix('/api/v1');

  await app.listen(3000)
  .then(() => {
    console.log("successfully started on port 3000");
  })
  .catch((error) => {
    console.log(error);
  })
}

bootstrap();
