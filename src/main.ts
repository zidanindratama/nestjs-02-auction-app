import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      allowedHeaders: ['content-type'],
      origin: 'https://auction-app-pbo.vercel.app/',
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );

  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: true,
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  //   credentials: true,
  // });
  app.use(cookieParser());
  await app.listen(3100);
}

bootstrap();
