import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '@domain/transaction/entity';
import { CreateTransactionRequest } from './request';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * This function returns all transactions from the transaction repository.
   * @returns The `findAll()` method is returning a promise that resolves to an array of all the
   * records in the `transactionRepository`. The `await` keyword is used to wait for the promise to
   * resolve before returning the result.
   */
  async findAll() {
    return await this.transactionRepository.find();
  }

  /**
   * This function creates a new transaction record in the database using the provided data.
   * @param {CreateTransactionRequest} data - CreateTransactionRequest object which contains the
   * following properties:
   */
  async createTransaction(data: CreateTransactionRequest) {
    this.transactionRepository
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values({
        reference_id: data.reference_id,
        wallet_id: data.wallet_id,
        amount: data.amount,
      })
      .execute();
  }
}
