import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transaction } from '../../entities/transaction/transaction.entity';

export interface ITransactionService {
  getLastTransactionsByAccountId(accountID: string): Promise<Transaction[]>;
  execute(createTransactionDTO: CreateTransactionDTO): Promise<Transaction>;
}
