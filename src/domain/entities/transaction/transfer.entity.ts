import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Customer } from '../customer/customer.entity';

@ChildEntity()
export class Transfer extends Transaction {
  @ManyToOne(() => BankAccount, (account) => account.transactions)
  @JoinColumn({ name: 'destination_account_id' })
  destinationAccount: BankAccount;

  constructor(
    createTransactionDto?: CreateTransactionDTO,
    customer?: Customer,
    account?: BankAccount,
    destinationAccount?: BankAccount,
  ) {
    super(createTransactionDto, customer, account);
    if (destinationAccount) this.destinationAccount = destinationAccount;
  }
}
