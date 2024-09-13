import { Transaction } from '../../domain/entities/transaction/transaction.entity';
import { IRepository } from './repository.interface';

export interface ITransactionRepository extends IRepository<Transaction> {
  findByAccountId(accountId: string): Promise<Transaction[]>;
}
