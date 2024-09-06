import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { AccountType } from '../../enums/account-type.enum';
import { ErrorContext } from '../../enums/error-context.enum';
import { ErrorMessage } from '../../enums/error-message.enum';
import { IAppErrorService } from '../../interfaces/apperror-service.interface';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from '../../interfaces/transaction/transaction.interface';

@Injectable()
export class WithdrawService implements ITransaction {
  constructor(@Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService) {}

  private withdrawFromSaving(account: SavingAccount, amount: number): void {
    if (amount > account.balance) {
      throw new BadRequestException(
        this.iAppErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.WITHDRAW),
      );
    }
    account.balance -= amount;
  }

  private withdrawFromChecking(account: CheckingAccount, amount: number): void {
    if (amount > account.balance + account.specialCheckLimit) {
      throw new BadRequestException(
        this.iAppErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.WITHDRAW),
      );
    }
    account.balance -= amount;
  }

  process(account: BankAccount, amount: number): void {
    if (account.type === AccountType.CHECKING_ACCOUNT) {
      return this.withdrawFromChecking(account as CheckingAccount, amount);
    }
    this.withdrawFromSaving(account, amount);
  }
}
