import { Customer } from '../../entities/customer/customer.entity';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';

export abstract class SavingAccountFactory {
  static create(createSavingAccountDto: CreateBankAccountDTO, customer: Customer): SavingAccount {
    return new SavingAccount(createSavingAccountDto, customer);
  }
}
