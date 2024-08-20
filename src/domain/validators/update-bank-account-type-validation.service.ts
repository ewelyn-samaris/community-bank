import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { AccountType } from '../enums/account-type.enum';
import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { BankAccount } from '../entities/bank-account/bank-account.entity';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IAppErrorService } from '../interfaces/apperror-service.interface';

@Injectable()
export class UpdateBankAccountTypeValidationService {
  private errorContext: ErrorContext = ErrorContext.UPDATE_BANK_ACCOUNT_TYPE;

  constructor(
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
    @Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService,
  ) {}

  private throwError(errorMessage: string): void {
    throw this.iAppErrorService.createError(errorMessage, this.errorContext);
  }

  private throwNotFountError(errorMessage: string): void {
    throw new NotFoundException(this.iAppErrorService.createError(errorMessage, this.errorContext));
  }

  private doesAccountExists(accountID: string): BankAccount {
    const account = this.iBankAccountService.getAccountById(accountID);
    if (!account) this.throwNotFountError(ErrorMessage.BANK_ACCOUNT_NOT_FOUND);
    return account;
  }

  private isAccountTypeDifferentFromCurrent(accountTypeToChangeTo: AccountType, currentAccount: BankAccount): void {
    if (currentAccount.type === accountTypeToChangeTo) this.throwError(ErrorMessage.ACCOUNT_TYPE_CANNOT_BE_SAME);
  }

  private doesCustomerExist(customerID: string): void {
    const customer = this.iCustomerService.getCustomerById(customerID);
    if (!customer) {
      this.throwNotFountError(ErrorMessage.CUSTOMER_NOT_FOUND);
    }
  }

  private doesCustomerExistAndOwnsAccount(account: BankAccount, customerId: string): void {
    this.doesCustomerExist(customerId);
    if (account.customerId !== customerId) {
      this.throwError(ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER);
    }
  }

  validate(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): void {
    const account = this.doesAccountExists(accountId);
    this.isAccountTypeDifferentFromCurrent(updateBankAccountTypeDTO.accountTypeToChangeTo, account);
    this.doesCustomerExistAndOwnsAccount(account, updateBankAccountTypeDTO.customerId);
  }
}
