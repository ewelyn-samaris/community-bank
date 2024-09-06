import { InternalServerErrorException } from '@nestjs/common';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { AccountType } from '../../enums/account-type.enum';
import { CheckingAccountFactory } from './checking-account.factory';
import { SavingAccountFactory } from './saving-account.factory';

export class BankAccountFactory {
  static create(createBankAccountDto: CreateBankAccountDTO, averageCapital: number): BankAccount {
    try {
      const factoryByType = {
        [AccountType.CHECKING_ACCOUNT]: () => CheckingAccountFactory.create(createBankAccountDto, averageCapital),
        [AccountType.SAVING_ACCOUNT]: () => SavingAccountFactory.create(createBankAccountDto),
      };

      const accountCreator = factoryByType[createBankAccountDto.accountType];
      return accountCreator();
    } catch (error) {
      throw new InternalServerErrorException(`Can't create bank-account. Internal server error: ${error}`);
    }
  }
}
