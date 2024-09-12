import { Transaction } from '../../entities/transaction/transaction.entity';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TransferFactory } from './transfer.factory';
import { DepositFactory } from './deposit.factory';
import { WithdrawFactory } from './withdraw.factory';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class TransactionFactory {
  static create(createTransactionDto: CreateTransactionDTO): Transaction {
    try {
      const factoryByType = {
        [TransactionType.TRANSFER]: () => TransferFactory.create(createTransactionDto),
        [TransactionType.DEPOSIT]: () => DepositFactory.create(createTransactionDto),
        [TransactionType.WITHDRAW]: () => WithdrawFactory.create(createTransactionDto),
      };

      const transactionCreator = factoryByType[createTransactionDto.type];
      return transactionCreator();
    } catch (error) {
      throw new InternalServerErrorException(`Can't process transaction. Internal server error: ${error}`);
    }
  }
}
