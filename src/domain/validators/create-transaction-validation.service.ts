import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from '../../application/dtos/create-transaction.dto';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { BankAccountService } from '../services/bank-account.service';
import { AppErrorService } from '../services/app-error.service';
import { BankAccount } from '../entities/bank-account.entity';

@Injectable()
export class CreateTransactionValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_TRANSACTION;

  constructor(
    private readonly bankAccountService: BankAccountService,
    private readonly appErrorService: AppErrorService,
  ) {}

  private doesAccountExists(accountID: string): BankAccount {
    const account = this.bankAccountService.getAccountById(accountID);
    if (!account) {
      throw this.appErrorService.createError(ErrorMessage.BANK_ACCOUNT_NOT_FOUND, this.errorContext);
    }
    return account;
  }

  private doesAccountBelongsToCustomer(customerId: string, account: BankAccount): void {
    const customerAccounts: BankAccount[] = this.bankAccountService.getAccountsByCustomerID(customerId);
    const correspondingAccount: boolean = customerAccounts.some((account) => account.id === account.id);
    if (!correspondingAccount) {
      throw this.appErrorService.createError(ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER, this.errorContext);
    }
  }

  validate(createTransactionDTO: CreateTransactionDTO): void {
    const account = this.doesAccountExists(createTransactionDTO.accountId);
    this.doesAccountBelongsToCustomer(createTransactionDTO.customerId, account);
  }
}
