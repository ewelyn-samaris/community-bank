import { BankAccount } from './bank-account.entity';
import { StatusType } from '../enums/status-type.enum';
import { CreateBankAccountDTO } from 'src/application/dtos/create-bank-account.dto';

export class CheckingAccount extends BankAccount {
  static checkingAccounts: CheckingAccount[] = [];
  specialCheckLimit: number;

  constructor(createCheckingAccountDto: CreateBankAccountDTO, specialCheckLimit: number) {
    super(createCheckingAccountDto);
    this.specialCheckLimit = specialCheckLimit;

    CheckingAccount.checkingAccounts.push(this);
  }

  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
