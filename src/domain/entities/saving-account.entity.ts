import { CreateBankAccountDTO } from 'src/application/dtos/create-bank-account.dto';
import { BankAccount } from '../entities/bank-account.entity';
import { StatusType } from '../enums/status-type.enum';

export class SavingAccount extends BankAccount {
  static savings: SavingAccount[] = [];

  constructor(createSavingAccountDto: CreateBankAccountDTO) {
    super(createSavingAccountDto);

    SavingAccount.savings.push(this);
  }

  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
