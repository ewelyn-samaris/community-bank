import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export interface IPaymentStrategy {
  process(account: BankAccount, banaficiaryAccount: BankAccount, amount: number): void;
}
