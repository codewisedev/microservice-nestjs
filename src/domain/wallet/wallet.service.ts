import { Injectable } from '@nestjs/common';
import { WalletRepository } from '@domain/wallet/wallet.repository';
import { Wallet } from '@domain/wallet/entity';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }

  findWalletByUserId(id: number): Promise<Wallet> {
    return this.walletRepository.findWalletByUserId(id);
  }

  updateWalletBalance(id: number, amount: number) {
    this.walletRepository.updateWalletBalance(id, amount);
  }
}
