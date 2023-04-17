import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(
        tap((data: unknown) => {
          const response = context.switchToHttp().getResponse();
          if (!data && response.statusCode !== HttpStatus.NO_CONTENT) {
            throw new NotFoundException();
          }
        }),
      )
      .pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();
          return {
            data: data,
            statusCode: response.statusCode,
            errors: [],
            message: 'Success',
          };
        }),
      );
  }
}
