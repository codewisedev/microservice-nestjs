import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '@domain/transaction/transaction.service';
import { Transaction } from '@domain/transaction/entity';
import { TransactionRepository } from '@domain/transaction/transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService, TransactionRepository],
  controllers: [],
  exports: [TransactionService],
})
export class TransactionModule {}
