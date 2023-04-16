import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Wallet } from '@domain/wallet/entity';

@Entity({ name: 'Transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Wallet, (wallet) => wallet.id)
  wallet_id: Wallet;

  @Column()
  reference_id: string;

  @Column()
  created_at: Date;
}
