import { Injectable } from '@nestjs/common';
import { WalletRepository } from '@domain/wallet/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}
}
