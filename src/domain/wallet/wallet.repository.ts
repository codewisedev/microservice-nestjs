import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '@domain/wallet/entity';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  /**
   * This function finds and returns a wallet object with a specific ID.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * `Wallet` entity. The `findOne` method is used to retrieve a single `Wallet` entity from the
   * database based on its `id`. The method returns a Promise that resolves to the retrieved `Wallet`
   * entity.
   * @returns The `findOne` method is returning a `Promise` that resolves to a `Wallet` object. The
   * `Wallet` object is retrieved from the `walletRepository` using the `findOne` method with the `id`
   * parameter as the search criteria. The `await` keyword is used to wait for the `Promise` to resolve
   * before returning the `Wallet` object.
   */
  async findOne(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ where: { id } });
  }

  /**
   * This function finds a wallet by user ID and returns a Promise containing the result.
   * @param {number} id - The `id` parameter is a number representing the user ID for which we want to
   * find the corresponding wallet.
   * @returns A `Promise` that resolves to a `Wallet` object. The `findWalletByUserId` function is an
   * asynchronous function that searches for a wallet in the database based on the provided user ID and
   * returns a `Promise` that resolves to the found `Wallet` object. The `await` keyword is used to
   * wait for the `findOne` method of the `walletRepository` to complete before returning
   */
  async findWalletByUserId(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ where: { user_id: id } });
  }

  /**
   * This is an async function that updates the balance of a wallet with a given ID using TypeORM.
   * @param {number} id - The ID of the wallet that needs to be updated.
   * @param {number} amount - The amount parameter is a number that represents the new balance to be
   * set for the wallet with the given id.
   * @returns The `updateWalletBalance` function is returning a Promise that resolves to the result of
   * executing an update query on the `Wallets` table in the database. The query updates the `balance`
   * field of the `Wallet` entity with the specified `amount` value for the `id` provided. The
   * `updateEntity(true)` method call indicates that the updated entity should be returned after the
   * update is
   */
  async updateWalletBalance(id: number, amount: number) {
    return await this.walletRepository
      .createQueryBuilder('Wallets')
      .where('id = :id', { id })
      .update<Wallet>(Wallet, { balance: amount })
      .updateEntity(true)
      .execute();
  }
}
