import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_id: number;

  @Column()
  reference_id: string;

  @Column()
  amount: number;

  @Column('varchar', { default: String(new Date()) })
  created_at: string;
}
