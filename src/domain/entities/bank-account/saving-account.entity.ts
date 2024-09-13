import { Column, Entity } from 'typeorm';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from './bank-account.entity';
import { Customer } from '../customer/customer.entity';

@Entity('savings_accounts')
export class SavingAccount extends BankAccount {
  @Column()
  interestRate: number;

  constructor(createSavingAccountDto?: CreateBankAccountDTO, customer?: Customer) {
    super(createSavingAccountDto, customer);
    this.interestRate = 0.01;
  }
}
