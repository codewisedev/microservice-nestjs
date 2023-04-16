import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@domain/user/user.service';
import { UserController } from '@domain/user/user.controller';
import { Transaction } from '@domain/transaction/entity';
import { TransactionRepository } from '@domain/transaction/transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [UserService, TransactionRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
