export interface UserByIdInterface {
  id: number;
}

export interface AddMoneyRequestInterface {
  id: number;
  amount: number;
}

export interface ReferenceInterface {
  reference_id: string;
}

export interface UserInterface {
  balance: number;
}

export interface UserServiceInterface {
  FindOne(request: UserByIdInterface): Promise<UserInterface>;
  AddMoney(request: AddMoneyRequestInterface): Promise<ReferenceInterface>;
}
