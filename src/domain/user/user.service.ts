import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import {
  UserByIdInterface,
  AddMoneyRequestInterface,
  ReferenceInterface,
  UserInterface,
} from '@domain/user/interface';
import { WalletService } from '@domain/wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService,
  ) {}

  async findOne(data: UserByIdInterface): Promise<UserInterface> {
    const user = await this.userRepository.findOne(data.id);
    const wallet = await this.walletService.findWalletByUserId(user.id);
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      balance: wallet.balance,
    };
  }

  addMoney(data): any {
    console.log('add money!!');
  }
}
