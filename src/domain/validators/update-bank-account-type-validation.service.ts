import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { AccountType } from '../enums/account-type.enum';
import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { BankAccount } from '../entities/bank-account/bank-account.entity';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ICustomerService } from '../interfaces/customer-service.interface';

@Injectable()
export class UpdateBankAccountTypeValidationService {
  private errorContext: ErrorContext = ErrorContext.UPDATE_BANK_ACCOUNT_TYPE;

  constructor(
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
  ) {}

  private throwError(errorMessage: string): void {
    throw new Error(`${this.errorContext} - ${errorMessage}`);
  }

  private throwNotFountError(errorMessage: string): void {
    throw new NotFoundException(`${this.errorContext} -${errorMessage}`);
  }

  private async doesAccountExists(accountID: string): Promise<BankAccount> {
    const account = await this.iBankAccountService.getAccountById(accountID);
    if (!account) this.throwNotFountError(ErrorMessage.BANK_ACCOUNT_NOT_FOUND);
    return account;
  }

  private isAccountTypeDifferentFromCurrent(accountTypeToChangeTo: AccountType, currentAccount: BankAccount): void {
    if (currentAccount.type === accountTypeToChangeTo) this.throwError(ErrorMessage.ACCOUNT_TYPE_CANNOT_BE_SAME);
  }

  private async doesCustomerExist(customerID: string): Promise<void> {
    const customer = await this.iCustomerService.getCustomerById(customerID);
    if (!customer) {
      this.throwNotFountError(ErrorMessage.CUSTOMER_NOT_FOUND);
    }
  }

  private async doesCustomerExistAndOwnsAccount(account: BankAccount, customerId: string): Promise<void> {
    await this.doesCustomerExist(customerId);
    if (account.customer.id !== customerId) {
      this.throwError(ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER);
    }
  }

  async validate(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): Promise<void> {
    const account = await this.doesAccountExists(accountId);
    this.isAccountTypeDifferentFromCurrent(updateBankAccountTypeDTO.accountTypeToChangeTo, account);
    await this.doesCustomerExistAndOwnsAccount(account, updateBankAccountTypeDTO.customerId);
  }
}
