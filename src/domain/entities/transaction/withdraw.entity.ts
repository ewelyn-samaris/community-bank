import { ChildEntity } from 'typeorm';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Customer } from '../customer/customer.entity';
import { BankAccount } from '../bank-account/bank-account.entity';

@ChildEntity()
export class Withdraw extends Transaction {
  constructor(createTransactionDto?: CreateTransactionDTO, customer?: Customer, account?: BankAccount) {
    super(createTransactionDto, customer, account);
  }
}
