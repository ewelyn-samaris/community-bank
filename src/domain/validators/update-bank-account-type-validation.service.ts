import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { BankAccountService } from '../services/bank-account.service';
import { AccountType } from '../enums/account-type.enum';
import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { CustomerService } from '../services/customer.service';
import { AppErrorService } from '../services/app-error.service';
import { BankAccount } from '../entities/bank-account.entity';

@Injectable()
export class UpdateBankAccountTypeValidationService {
  private errorContext: ErrorContext = ErrorContext.UPDATE_BANK_ACCOUNT_TYPE;

  constructor(
    private readonly bankAccountService: BankAccountService,
    private readonly customerService: CustomerService,
    private readonly appErrorService: AppErrorService,
  ) {}

  private throwBadRequestError(errorMessage: string): void {
    throw new BadRequestException(this.appErrorService.createError(errorMessage, this.errorContext));
  }

  private throwNotFountError(errorMessage: string): void {
    throw new NotFoundException(this.appErrorService.createError(errorMessage, this.errorContext));
  }

  private doesAccountExists(accountID: string): BankAccount {
    const account = this.bankAccountService.getAccountById(accountID);
    if (!account) this.throwNotFountError(ErrorMessage.BANK_ACCOUNT_NOT_FOUND);
    return account;
  }

  private isAccountTypeDifferentFromCurrent(accountTypeToChangeTo: AccountType, currentAccount: BankAccount): void {
    if (currentAccount.type === accountTypeToChangeTo)
      this.throwBadRequestError(ErrorMessage.ACCOUNT_TYPE_CANNOT_BE_SAME);
  }

  private doesCustomerExist(customerID: string): void {
    const customer = this.customerService.getCustomerById(customerID);
    if (!customer) {
      this.throwNotFountError(ErrorMessage.CUSTOMER_DOES_NOT_EXIST);
    }
  }

  private doesCustomerExistAndOwnsAccount(account: BankAccount, customerId: string): BankAccount {
    this.doesCustomerExist(customerId);

    if (account.customerId !== customerId) {
      this.throwBadRequestError(ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER);
    }
    return account;
  }

  validate(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): void {
    const account = this.doesAccountExists(accountId);
    this.isAccountTypeDifferentFromCurrent(updateBankAccountTypeDTO.accountTypeToChangeTo, account);
    this.doesCustomerExistAndOwnsAccount(account, updateBankAccountTypeDTO.customerId);
  }
}
