import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Deposit } from '../../entities/transaction/deposit.entity';

export abstract class DepositFactory {
  static create(createDepositDto: CreateTransactionDTO): Deposit {
    return new Deposit(createDepositDto);
  }
}
