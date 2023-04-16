import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@domain/user/user.service';
import { UserController } from '@domain/user/user.controller';
import { User } from '@domain/user/entity';
import { UserRepository } from '@domain/user/user.repository';
import { WalletModule } from '@domain/wallet/wallet.module';
import { TransactionModule } from '@domain/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule, TransactionModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
