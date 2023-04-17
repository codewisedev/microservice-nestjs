import { Wallet } from '@domain/wallet/entity';

export const mockWallet: Wallet = {
  id: 1,
  user_id: 1,
  wallet_name: 'myWallet',
  balance: 0,
  created_at: String(new Date()),
};
