import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { SavingAccount } from '../entities/saving-account.entity';

export abstract class SavingAccountFactory {
  static create(createSavingAccountDto: CreateBankAccountDTO): SavingAccount {
    return new SavingAccount(createSavingAccountDto);
  }
}
