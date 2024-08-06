import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CheckingAccount } from '../entities/checking-account.entity';
import { CheckingAccountFactory } from '../factories/checking-account.factory';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';
import { AppErrorService } from './app-error.service';
import { Customer } from '../entities/customer.entity';
import { CustomerService } from './customer.service';
import 'dotenv/config';

@Injectable()
export class CheckingAccountService {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly appErrorService: AppErrorService,
  ) {}

  private getCheckLimitByAvarageIncome(customerAverageIncome: number): number {
    const incrementValue: number =
      Math.floor(
        (customerAverageIncome - parseInt(process.env.MIN_TO_CHECK_ACCOUNT)) /
          parseInt(process.env.CHECK_SPECIAL_INCREMENT_VALUE),
      ) * parseInt(process.env.MIN_CHECK_SPECIAL_LIMIT);

    return parseInt(process.env.MIN_CHECK_SPECIAL_LIMIT) + incrementValue;
  }

  private getCheckLimitForAccount(customerId: string): number | null {
    const customer: Customer = this.customerService.getCustomerById(customerId);
    return this.getCheckLimitByAvarageIncome(customer.averageIncome);
  }

  getAccounts(): CheckingAccount[] {
    return CheckingAccount.checkingAccounts;
  }

  getAccountById(id: string): CheckingAccount {
    return CheckingAccount.checkingAccounts.find((account) => account.id === id);
  }

  getAccountsByCustomerID(customerID: string): CheckingAccount[] {
    return CheckingAccount.checkingAccounts.filter((account) => account.customerId === customerID);
  }

  softDeleteAccount(accountId: string): void {
    this.getAccountById(accountId).updateStatusBeforeSoftDelete();
  }

  createCheckingAccount(createCheckingAccountDTO: CreateBankAccountDTO): CheckingAccount {
    const checkLimit: number = this.getCheckLimitForAccount(createCheckingAccountDTO.customerId);
    const checkingAccount = CheckingAccountFactory.create(createCheckingAccountDTO, checkLimit);
    this.customerService.getCustomerById(createCheckingAccountDTO.customerId).accountsIds.push(checkingAccount.id);
    return checkingAccount;
  }

  deposit(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);
    if (amount < parseInt(process.env.MIN_DEPOSIT)) {
      throw this.appErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.DEPOSIT);
    }
    account.balance += amount;
  }

  withdraw(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);

    if (amount > account.balance + account.specialCheckLimit) {
      throw this.appErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.WITHDRAW);
    }
    account.balance -= amount;
  }
}
