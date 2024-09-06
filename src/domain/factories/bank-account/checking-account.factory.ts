import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';

export class CheckingAccountFactory {
  static create(createCheckingAccountDto: CreateBankAccountDTO, averageCapital: number): CheckingAccount {
    const specialCheckLimit: number = this.getCheckLimitByAvarageIncome(averageCapital);
    return new CheckingAccount(createCheckingAccountDto, specialCheckLimit);
  }

  private static getCheckLimitByAvarageIncome(customerAverageCapital: number): number {
    return (
      Math.floor(customerAverageCapital / parseInt(process.env.MIN_TO_CHECK_ACCOUNT)) *
      parseInt(process.env.CHECK_SPECIAL_INCREMENT_VALUE)
    );
  }
}
