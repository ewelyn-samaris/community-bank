import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { BankAccount } from '../entities/bank-account/bank-account.entity';

export interface IBankAccountService {
  getAll(): BankAccount[];
  getAccountById(accountID: string): BankAccount;
  getAccountsByCustomerID(customerID: string): BankAccount[];
  createBankAccount(createBankAccountDTO: CreateBankAccountDTO): BankAccount;
  modifyAccountType(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): BankAccount;
  softDeleteAccount(accountId: string): void;
}
