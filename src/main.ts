import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'https://auction-app-pbo.vercel.app',
    'http://localhost:3000',
  ];

  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('CORS ERROR'));
  //     }
  //   },
  //   allowedHeaders: [
  //     'Access-Control-Request-Method',
  //     'Access-Control-Request-Headers',
  //     'Access-Control-Allow-Methods',
  //     'Access-Control-Allow-Credentials',
  //     'Access-Control-Allow-Headers',
  //     'Access-Control-Allow-Origin',
  //     'Origin',
  //     'X-Requested-With',
  //     'Content-Type',
  //     'Accept',
  //     'Authorization',
  //     'X-HTTP-Method-Override',
  //     'Set-Cookie',
  //     'Cookie',
  //     'Request',
  //     'withCredentials',
  //   ],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  //   credentials: true,
  //   optionsSuccessStatus: 200,
  //   // @ts-ignore
  //   origin: ['http://localhost:3000', 'https://tax-center-brevet.vercel.app'],
  // });

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('CORS ERROR'));
        }
      },
      allowedHeaders: [
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-HTTP-Method-Override',
        'Set-Cookie',
        'Cookie',
        'Request',
        'withCredentials',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true,
      optionsSuccessStatus: 200,
      // @ts-ignore
      origin: ['http://localhost:3000', 'https://auction-app-pbo.vercel.app'],
    }),
  );

  app.use(cookieParser());
  await app.listen(3100);
}

bootstrap();
