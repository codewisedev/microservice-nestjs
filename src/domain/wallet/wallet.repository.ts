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

  async findWalletByUserId(id: number): Promise<Wallet> {
    return await this.walletRepository.findOne({ where: { id } });
  }
}
