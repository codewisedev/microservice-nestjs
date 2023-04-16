import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from '@domain/wallet/wallet.service';
import { Wallet } from '@domain/wallet/entity';
import { WalletRepository } from '@domain/wallet/wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService, WalletRepository],
  controllers: [],
  exports: [WalletService],
})
export class UsersModule {}
