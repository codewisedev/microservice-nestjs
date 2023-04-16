import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '@domain/transaction/transaction.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  createTransaction(data) {
    this.createTransaction(data);
  }

  @Cron('0 59 23 * * *', { name: 'sum transactions amount' })
  async calculateAllTransactionAmount() {
    const transactions = await this.transactionRepository.findAll();
    const total = transactions.map((transaction) => transaction.amount);
    console.log(`Total amounts of transactions: ${total}`);
  }
}
