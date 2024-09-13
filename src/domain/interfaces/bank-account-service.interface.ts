import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { BankAccount } from '../entities/bank-account/bank-account.entity';

export interface IBankAccountService {
  save(account: BankAccount): Promise<BankAccount>;
  getAll(): Promise<BankAccount[]>;
  getAccountById(accountId: string): Promise<BankAccount>;
  getAccountsByCustomerId(customerId: string): Promise<BankAccount[]>;
  createBankAccount(createBankAccountDto: CreateBankAccountDTO): Promise<BankAccount>;
  modifyAccountType(updateBankAccountTypeDto: UpdateBankAccountTypeDTO, accountId: string): Promise<BankAccount>;
  softRemoveAccount(account: BankAccount): Promise<void>;
}
