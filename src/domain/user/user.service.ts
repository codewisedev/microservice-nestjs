import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import {
  UserByIdInterface,
  AddMoneyRequestInterface,
  ReferenceInterface,
  UserInterface,
} from '@domain/user/interface';
import { WalletService } from '@domain/wallet/wallet.service';
import { TransactionService } from '@domain/transaction/transaction.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService,
    private transactionService: TransactionService,
  ) {}

  async findOne(data: UserByIdInterface): Promise<UserInterface> {
    const user = await this.userRepository.findOne(data.id);
    const wallet = await this.walletService.findWalletByUserId(data.id);
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      balance: wallet.balance,
    };
  }

  async addMoney(data: AddMoneyRequestInterface): Promise<ReferenceInterface> {
    const wallet = await this.walletService.findWalletByUserId(data.id);
    const newAmount = wallet.balance + data.amount;
    this.walletService.updateWalletBalance(wallet.id, newAmount);

    const referenceId = (
      Math.floor(Math.random() * (Math.floor(999999) - Math.ceil(0) + 1)) + 0
    )
      .toString()
      .padStart(6, '0');

    this.transactionService.createTransaction({
      wallet_id: wallet.id,
      reference_id: referenceId,
      amount: data.amount,
    });

    return { reference_id: referenceId };
  }
}
