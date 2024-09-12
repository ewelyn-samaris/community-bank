import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transaction } from '../../entities/transaction/transaction.entity';

export interface ITransactionService {
  getLastTransactionsByAccountID(accountID: string): Transaction[];
  execute(createTransactionDTO: CreateTransactionDTO): Transaction;
}
