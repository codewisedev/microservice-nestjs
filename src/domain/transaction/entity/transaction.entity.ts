import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: string;
}
