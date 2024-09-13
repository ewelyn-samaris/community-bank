import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Withdraw } from '../../entities/transaction/withdraw.entity';
import { Customer } from '../../entities/customer/customer.entity';

export abstract class WithdrawFactory {
  static create(createWithdrawDto: CreateTransactionDTO, customer: Customer, account: BankAccount): Withdraw {
    return new Withdraw(createWithdrawDto, customer, account);
  }
}
