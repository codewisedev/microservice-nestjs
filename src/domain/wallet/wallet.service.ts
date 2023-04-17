import { Injectable } from '@nestjs/common';
import { WalletRepository } from '@domain/wallet/wallet.repository';
import { Wallet } from '@domain/wallet/entity';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  /**
   * This function returns a Promise that resolves to a Wallet object with the specified id.
   * @param {number} id - The "id" parameter is a number that represents the unique identifier of a
   * wallet. The "findOne" method is used to retrieve a single wallet from the database based on its
   * id.
   * @returns A function that takes in an `id` parameter of type `number` and returns a `Promise` that
   * resolves to a `Wallet` object. The `findOne` method is likely used to retrieve a single `Wallet`
   * object from a data source (such as a database) based on the provided `id`.
   */
  findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }

  /**
   * This function returns a Promise that finds a Wallet by its associated user ID.
   * @param {number} id - The parameter "id" is a number that represents the user ID for which we want
   * to find the wallet.
   * @returns A function that returns a Promise of a Wallet object. The function takes in a number
   * parameter called "id" and calls the "findWalletByUserId" method of the "walletRepository" object
   * with the "id" parameter.
   */
  findWalletByUserId(id: number): Promise<Wallet> {
    return this.walletRepository.findWalletByUserId(id);
  }

  /**
   * This function updates the balance of a wallet with a given ID by a specified amount.
   * @param {number} id - The id parameter is a number that represents the unique identifier of a
   * wallet. It is used to identify which wallet to update the balance for.
   * @param {number} amount - The amount parameter is a number that represents the new balance to be
   * set for a wallet with the specified id.
   */
  updateWalletBalance(id: number, amount: number) {
    this.walletRepository.updateWalletBalance(id, amount);
  }
}
