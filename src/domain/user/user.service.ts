import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import { WalletService } from '@domain/wallet/wallet.service';
import { TransactionService } from '@domain/transaction/transaction.service';
import { AddMoneyResponse, FindUserResponse } from './response';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService,
    private transactionService: TransactionService,
  ) {}

  async findOne(user_id: number): Promise<FindUserResponse> {
    const wallet = await this.walletService.findWalletByUserId(user_id);
    return { balance: wallet.balance };
  }

  async addMoney(user_id: number, amount: number): Promise<AddMoneyResponse> {
    const wallet = await this.walletService.findWalletByUserId(0);

    if (wallet) {
      const newAmount = wallet.balance + amount;
      this.walletService.updateWalletBalance(wallet.id, newAmount);

      const referenceId = (
        Math.floor(Math.random() * (Math.floor(999999) - Math.ceil(0) + 1)) + 0
      )
        .toString()
        .padStart(6, '0');

      return { reference_id: referenceId };
    } else {
      throw new BadRequestException('User not found!!');
    }
  }
}
