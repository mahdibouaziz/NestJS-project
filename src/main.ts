import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFunctionalMiddleware } from './middelware/logger-functional.middleware';
import * as morgan from 'morgan';
import { DurationnInterceptor } from './interceptor/durationn.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //applying hemlet middleware
  //app.use(helmet());
  //applying morgan middleware
  app.use(morgan('dev'));
  //Applying cors
  const corsOptions = {
    origin: ['http://localhost:4200'],
  };
  app.enableCors(corsOptions);

  //it must be a middleware function
  app.use(LoggerFunctionalMiddleware);
  app.useGlobalInterceptors(new DurationnInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
