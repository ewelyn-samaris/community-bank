import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from './bank-account.entity';

export class SavingAccount extends BankAccount {
  static savings: SavingAccount[] = [];

  constructor(createSavingAccountDto: CreateBankAccountDTO) {
    super(createSavingAccountDto);

    SavingAccount.savings.push(this);
  }
}
