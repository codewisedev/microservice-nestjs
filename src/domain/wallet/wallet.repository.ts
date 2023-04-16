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

  async findOne(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ where: { id } });
  }

  async findWalletByUserId(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ where: { user_id: id } });
  }

  async updateWalletBalance(id: number, amount: number) {
    return await this.walletRepository
      .createQueryBuilder('Wallets')
      .where('id = :id', { id })
      .update<Wallet>(Wallet, { balance: amount })
      .updateEntity(true)
      .execute();
  }
}
