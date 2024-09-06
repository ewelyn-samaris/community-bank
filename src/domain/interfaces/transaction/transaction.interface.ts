import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export interface ITransaction {
  process(originAccount: BankAccount, amount: number, destinationAccount?: BankAccount): void;
}
