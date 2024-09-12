import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from './bank-account.entity';

export class CheckingAccount extends BankAccount {
  static checkingAccounts: CheckingAccount[] = [];
  specialCheckLimit: number;

  constructor(createBankAccountDto: CreateBankAccountDTO, specialCheckLimit: number) {
    super(createBankAccountDto);
    this.specialCheckLimit = specialCheckLimit;

    CheckingAccount.checkingAccounts.push(this);
  }
}
