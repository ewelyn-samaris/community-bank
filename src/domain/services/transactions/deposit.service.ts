import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorContext } from '../../enums/error-context.enum';
import { ErrorMessage } from '../../enums/error-message.enum';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from '../../interfaces/transaction/transaction.interface';

@Injectable()
export class DepositService implements ITransaction {
  private deposit(account: BankAccount, amount: number): void {
    if (amount < parseInt(process.env.MIN_DEPOSIT)) {
      throw new BadRequestException(ErrorMessage.INVALID_AMOUNT, ErrorContext.DEPOSIT);
    }
    account.balance += amount;
  }

  process(account: BankAccount, amount: number): void {
    this.deposit(account, amount);
  }
}
