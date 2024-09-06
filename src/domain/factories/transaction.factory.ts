import { Transaction } from '../entities/transaction.entity';
import { Deposit } from '../entities/deposit.entity';
import { TransactionType } from '../enums/transaction-type.enum';
import { Withdraw } from '../entities/withdraw.entity';
import { Transfer } from '../entities/transfer.entity';
import { CreateTransactionDTO } from 'src/application/dtos/create-transaction.dto';

export abstract class TransactionFactory {
  static create(createTransactionDto: CreateTransactionDTO): Transaction {
    if (createTransactionDto.type === TransactionType.DEPOSIT) {
      return new Deposit(createTransactionDto);
    } else if (createTransactionDto.type === TransactionType.WITHDRAW) {
      return new Withdraw(createTransactionDto);
    } else {
      return new Transfer(createTransactionDto);
    }
  }
}
