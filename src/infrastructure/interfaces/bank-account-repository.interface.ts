import { BankAccount } from '../../domain/entities/bank-account/bank-account.entity';
import { IRepository } from './repository.interface';

export interface IBankAccountRepository<T extends BankAccount> extends IRepository<T> {
  findOneById(accountId: string): Promise<T>;
  findByCustomerId(customerId: string): Promise<T[]>;
  softRemove(account: T): Promise<void>;
}
