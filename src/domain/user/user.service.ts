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

  /**
   * This function finds a user's wallet by their ID and returns the balance.
   * @param {number} user_id - The user_id parameter is a number that is used to find a user's wallet
   * and return their balance.
   * @returns The `findOne` function is returning a Promise that resolves to a `FindUserResponse`
   * object. The `FindUserResponse` object has a single property `balance` which is the balance of the
   * wallet associated with the given `user_id`.
   */
  async findOne(user_id: number): Promise<FindUserResponse> {
    const wallet = await this.walletService.findWalletByUserId(user_id);
    if (wallet) {
      return { balance: wallet.balance };
    } else {
      throw new BadRequestException('User not found!!');
    }
  }

  /**
   * This function adds a specified amount of money to a user's wallet and returns a reference ID.
   * @param {number} user_id - The user ID is a number that identifies a specific user in the system.
   * @param {number} amount - The amount of money to be added to the user's wallet balance.
   * @returns a Promise that resolves to an object of type AddMoneyResponse. The object contains a
   * randomly generated reference_id as a string.
   */
  async addMoney(user_id: number, amount: number): Promise<AddMoneyResponse> {
    const wallet = await this.walletService.findWalletByUserId(user_id);

    if (wallet) {
      const newAmount = wallet.balance + amount;

      if (newAmount > 0) {
        this.walletService.updateWalletBalance(wallet.id, newAmount);

        /* This code generates a random 6-digit reference ID as a string. */
        const referenceId = (
          Math.floor(Math.random() * (Math.floor(999999) - Math.ceil(0) + 1)) +
          0
        )
          .toString()
          .padStart(6, '0');

        return { reference_id: referenceId };
      } else {
        throw new BadRequestException(
          'The transaction amount is greater than of wallet balance!!',
        );
      }
    } else {
      throw new BadRequestException('User not found!!');
    }
  }
}
