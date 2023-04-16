import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '@domain/user/entity';

@Entity({ name: 'Wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User, (user) => user.id)
  user_id: User;

  @Column()
  wallet_name: string;

  @Column()
  balance: number;

  @Column()
  created_at: Date;
}
