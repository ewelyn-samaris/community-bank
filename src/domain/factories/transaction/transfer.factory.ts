import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transfer } from '../../entities/transaction/transfer.entity';
import { Customer } from '../../entities/customer/customer.entity';

export abstract class TransferFactory {
  static create(
    createTransferDto: CreateTransactionDTO,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ): Transfer {
    return new Transfer(createTransferDto, customer, account, destinationAccount);
  }
}
