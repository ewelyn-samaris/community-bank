import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from '../../application/dtos/create-transaction.dto';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { BankAccount } from '../entities/bank-account/bank-account.entity';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';

@Injectable()
export class CreateTransactionValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_TRANSACTION;

  constructor(@Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService) {}

  private doesAccountExists(accountID: string): BankAccount {
    const account = this.iBankAccountService.getAccountById(accountID);
    if (!account) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.BANK_ACCOUNT_NOT_FOUND}`);
    }
    return account;
  }

  private doesAccountBelongsToCustomer(customerId: string, account: BankAccount): void {
    const customerAccounts: BankAccount[] = this.iBankAccountService.getAccountsByCustomerID(customerId);
    const correspondingAccount: boolean = customerAccounts.some((account) => account.id === account.id);
    if (!correspondingAccount) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER}`);
    }
  }

  validate(createTransactionDTO: CreateTransactionDTO): void {
    const account = this.doesAccountExists(createTransactionDTO.accountId);
    this.doesAccountBelongsToCustomer(createTransactionDTO.customerId, account);
  }
}
