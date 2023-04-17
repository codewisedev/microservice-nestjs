import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  wallet_name: string;

  @Column()
  balance: number;

  @Column('varchar', { default: String(new Date()) })
  created_at: string;
}
