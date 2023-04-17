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

    return next.handle().pipe(
      tap(async (data) => {
        if (response.statusCode === HttpStatus.CREATED) {
          const wallet = await this.walletService.findWalletByUserId(0);
          console.log(request.body.amount);

          if (wallet) {
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
