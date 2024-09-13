import { Customer } from '../../entities/customer/customer.entity';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Deposit } from '../../entities/transaction/deposit.entity';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export abstract class DepositFactory {
  static create(createDepositDto: CreateTransactionDTO, customer: Customer, account: BankAccount): Deposit {
    return new Deposit(createDepositDto, customer, account);
  }
}
