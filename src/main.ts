import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
// import { default as passport } from './'
// import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  app.setGlobalPrefix('/api/v1');
  // app.use(passport.initialize())
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true
    })
  );

  await app.listen(3000)
  .then(() => {
    console.log("successfully started on port 3000");
  })
  .catch((error) => {
    console.log(error);
  })
}

bootstrap();
