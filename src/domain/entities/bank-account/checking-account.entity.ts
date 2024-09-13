import { Column, Entity } from 'typeorm';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from './bank-account.entity';
import { Customer } from '../customer/customer.entity';

@Entity('checking_accounts')
export class CheckingAccount extends BankAccount {
  @Column()
  specialCheckLimit: number;

  constructor(createBankAccountDto?: CreateBankAccountDTO, customer?: Customer, specialCheckLimit?: number) {
    super(createBankAccountDto, customer);
    if (specialCheckLimit) this.specialCheckLimit = specialCheckLimit;
  }
}
