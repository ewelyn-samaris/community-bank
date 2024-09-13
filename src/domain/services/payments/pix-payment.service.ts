import { BadRequestException } from '@nestjs/common';
import { IPaymentStrategy } from '../../interfaces/payment/payment-strategy.interface';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { ErrorContext } from '../../enums/error-context.enum';
import { ErrorMessage } from '../../enums/error-message.enum';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';
import { AccountType } from '../../enums/account-type.enum';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export class PixPaymentService implements IPaymentStrategy {
  private billPaymentFromSaving(account: SavingAccount, beneficiaryAccount: BankAccount, amount: number): void {
    if (amount > account.balance) {
      throw new BadRequestException(
        ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE,
        ErrorContext.PROCESS_PIX_PAYMENT,
      );
    }
    account.balance -= amount;
    beneficiaryAccount.balance += amount;
  }

  private billPaymentFromChecking(account: CheckingAccount, beneficiaryAccount: BankAccount, amount: number): void {
    if (amount > account.balance + account.specialCheckLimit) {
      throw new BadRequestException(
        ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE,
        ErrorContext.PROCESS_PIX_PAYMENT,
      );
    }
    account.balance -= amount;
    beneficiaryAccount.balance += amount;
  }

  process(account: BankAccount, beneficiaryAccount: BankAccount, amount: number): void {
    account.type === AccountType.CHECKING_ACCOUNT
      ? this.billPaymentFromChecking(account as CheckingAccount, beneficiaryAccount, amount)
      : this.billPaymentFromSaving(account as SavingAccount, beneficiaryAccount, amount);
  }
}
