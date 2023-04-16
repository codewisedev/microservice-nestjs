import { Injectable } from '@nestjs/common';
import { WalletRepository } from '@domain/wallet/wallet.repository';
import { Wallet } from '@domain/wallet/entity';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async findWalletByUserId(id: number): Promise<Wallet> {
    return await this.walletRepository.findWalletByUserId(id);
  }
}
