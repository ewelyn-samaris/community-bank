import { CreateBankAccountDTO } from 'src/application/dtos/create-bank-account.dto';
import { CheckingAccount } from '../entities/checking-account.entity';

export abstract class CheckingAccountFactory {
  static create(createCheckingAccountDto: CreateBankAccountDTO, specialCheckLimit: number): CheckingAccount {
    return new CheckingAccount(createCheckingAccountDto, specialCheckLimit);
  }
}
