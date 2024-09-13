import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { AccountType } from '../../enums/account-type.enum';
import { CheckingAccountFactory } from './checking-account.factory';
import { SavingAccountFactory } from './saving-account.factory';
import { Customer } from '../../entities/customer/customer.entity';

export class BankAccountFactory {
  static create(createBankAccountDto: CreateBankAccountDTO, customer: Customer): BankAccount {
    const factoryByType = {
      [AccountType.CHECKING_ACCOUNT]: () => CheckingAccountFactory.create(createBankAccountDto, customer),
      [AccountType.SAVING_ACCOUNT]: () => SavingAccountFactory.create(createBankAccountDto, customer),
    };

    const accountCreator = factoryByType[createBankAccountDto.accountType];
    return accountCreator();
  }
}
