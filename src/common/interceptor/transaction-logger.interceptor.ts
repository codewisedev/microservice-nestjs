import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TransactionService } from '@domain/transaction/transaction.service';
import { WalletService } from '@domain/wallet/wallet.service';

@Injectable()
export class TransactionLoggerInterceptor implements NestInterceptor {
  constructor(
    private transactionService: TransactionService,
    private walletService: WalletService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    /* This code is defining an interceptor in NestJS that logs transactions. The `intercept` method is
    called for every incoming request, and it receives the current execution context and a
    `CallHandler` object that represents the next middleware or controller method in the chain. */
    return next.handle().pipe(
      tap(async (data) => {
        if (response.statusCode === HttpStatus.CREATED) {
          const wallet = await this.walletService.findWalletByUserId(
            request.body.user_id,
          );

          if (wallet) {
            /* `this.transactionService.createTransaction()` is a method call that creates a new
            transaction record in the database. It takes an object with three properties as its
            argument: `reference_id`, `wallet_id`, and `amount`. */
            this.transactionService.createTransaction({
              reference_id: data.reference_id,
              wallet_id: wallet.id,
              amount: request.body.amount,
            });
          } else {
            throw new BadRequestException();
          }
        }
      }),
    );
  }
}
