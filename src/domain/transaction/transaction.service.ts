import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '@domain/transaction/transaction.repository';
import { Cron } from '@nestjs/schedule';
import { CreateTransactionRequest } from './request';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  /**
   * This function creates a transaction using the provided data.
   * @param {CreateTransactionRequest} data - CreateTransactionRequest object which contains the
   * necessary information to create a transaction. This could include details such as the amount,
   * currency, payment method, and recipient information.
   */
  createTransaction(data: CreateTransactionRequest) {
    this.transactionRepository.createTransaction(data);
  }

  /* This is a method in the `TransactionService` class that uses the `@Cron` decorator from the
  `@nestjs/schedule` package to schedule a task to run at a specific time. The task is to calculate
  the total amount of all transactions stored in the database. The cron expression `'0 59 23 * * *'`
  specifies that the task should run at 23:59:00 every day. The method retrieves all transactions
  from the database using the `TransactionRepository`, calculates the total amount by mapping over
  the transactions and summing the `amount` property, and logs the result to the console. */
  @Cron('0 59 23 * * *', { name: 'sum transactions amount' })
  async calculateAllTransactionAmount() {
    const transactions = await this.transactionRepository.findAll();
    const total = transactions.map((transaction) => transaction.amount);
    console.log(`Total amounts of transactions: ${total}`);
  }
}
