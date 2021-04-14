import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DurationnInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log(`first request date: ${dateIn}`);
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(`response date: ${dateOut}`);
        console.log(`request done in ${dateOut - dateIn}ms`);
      }),
    );
  }
}
