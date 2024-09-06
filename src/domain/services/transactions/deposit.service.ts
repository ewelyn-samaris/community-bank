import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { ErrorContext } from '../../enums/error-context.enum';
import { ErrorMessage } from '../../enums/error-message.enum';
import { IAppErrorService } from '../../interfaces/apperror-service.interface';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from 'src/domain/interfaces/transaction/transaction.interface';

@Injectable()
export class DepositService implements ITransaction {
  constructor(@Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService) {}

  private deposit(account: SavingAccount, amount: number): void {
    if (amount < parseInt(process.env.MIN_DEPOSIT)) {
      throw new BadRequestException(
        this.iAppErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.DEPOSIT),
      );
    }
    account.balance += amount;
  }

  process(account: BankAccount, amount: number): void {
    this.deposit(account, amount);
  }
}
