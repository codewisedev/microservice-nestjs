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

  async findAll() {
    return await this.transactionRepository.find();
  }

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
