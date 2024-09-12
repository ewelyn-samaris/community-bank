import { Injectable } from '@nestjs/common';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';

@Injectable()
export class CheckingAccountService {
  getAll(): CheckingAccount[] {
    return CheckingAccount.checkingAccounts;
  }
}
