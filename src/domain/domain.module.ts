import { Module } from '@nestjs/common';
import { TransactionModule } from '@domain/transaction/transaction.module';
import { UserModule } from '@domain/user/user.module';
import { WalletModule } from '@domain/wallet/wallet.module';

@Module({
  imports: [TransactionModule, UserModule, WalletModule],
})
export class DomainModule {}
