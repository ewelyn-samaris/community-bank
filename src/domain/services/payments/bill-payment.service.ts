import { BadRequestException } from '@nestjs/common';
import { IPaymentStrategy } from '../../interfaces/payment/payment-strategy.interface';
import { ErrorMessage } from '../../enums/error-message.enum';
import { ErrorContext } from '../../enums/error-context.enum';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';
import { AccountType } from '../../enums/account-type.enum';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export class BillPaymentService implements IPaymentStrategy {
  private billPaymentFromSaving(account: SavingAccount, beneficiaryAccount: BankAccount, amount: number): void {
    if (amount > account.balance) {
      throw new BadRequestException(
        ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE,
        ErrorContext.PROCESS_BILL_PAYMENT,
      );
    }
    account.balance -= amount;
    beneficiaryAccount.balance += amount;
  }

  private billPaymentFromChecking(account: CheckingAccount, beneficiaryAccount: BankAccount, amount: number): void {
    if (amount > account.balance + account.specialCheckLimit) {
      throw new BadRequestException(
        ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE,
        ErrorContext.PROCESS_BILL_PAYMENT,
      );
    }
    account.balance -= amount;
    beneficiaryAccount.balance += amount;
  }

  process(account: BankAccount, beneficiaryAccount: BankAccount, amount: number): void {
    if (account.type === AccountType.CHECKING_ACCOUNT) {
      return this.billPaymentFromChecking(account as CheckingAccount, beneficiaryAccount, amount);
    }
    return this.billPaymentFromSaving(account, beneficiaryAccount, amount);
  }
}
