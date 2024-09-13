import { Transaction } from '../../entities/transaction/transaction.entity';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TransferFactory } from './transfer.factory';
import { DepositFactory } from './deposit.factory';
import { WithdrawFactory } from './withdraw.factory';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Customer } from '../../entities/customer/customer.entity';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export abstract class TransactionFactory {
  static create(
    createTransactionDto: CreateTransactionDTO,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ): Transaction {
    const factoryByType = {
      [TransactionType.TRANSFER]: () =>
        TransferFactory.create(createTransactionDto, customer, account, destinationAccount),
      [TransactionType.DEPOSIT]: () => DepositFactory.create(createTransactionDto, customer, account),
      [TransactionType.WITHDRAW]: () => WithdrawFactory.create(createTransactionDto, customer, account),
    };

    const transactionCreator = factoryByType[createTransactionDto.type];
    return transactionCreator();
  }
}
