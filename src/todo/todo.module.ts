//import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerFunctionalMiddleware } from 'src/middelware/logger-functional.middleware';
import { LoggerMiddleware } from 'src/middelware/logger.middleware';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, LoggerFunctionalMiddleware).forRoutes('');
    /* .apply(HelmetMiddleware)
      .forRoutes(''); */
  }
}
