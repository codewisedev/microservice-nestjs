import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '@domain/transaction/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}
}
