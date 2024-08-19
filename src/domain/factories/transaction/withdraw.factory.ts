import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Withdraw } from '../../entities/transaction/withdraw.entity';

export abstract class WithdrawFactory {
  static create(createWithdrawDto: CreateTransactionDTO): Withdraw {
    return new Withdraw(createWithdrawDto);
  }
}
