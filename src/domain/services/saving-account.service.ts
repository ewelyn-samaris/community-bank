import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SavingAccount } from '../entities/saving-account.entity';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { SavingAccountFactory } from '../factories/saving-account.factory';
import { AppErrorService } from '../services/app-error.service';
import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';
import { CustomerService } from './customer.service';
import 'dotenv/config';

@Injectable()
export class SavingAccountService {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly appErrorService: AppErrorService,
  ) {}

  getAccounts(): SavingAccount[] {
    return SavingAccount.savings;
  }

  getAccountById(id: string): SavingAccount {
    return SavingAccount.savings.find((saving) => saving.id === id);
  }

  getAccountsByCustomerID(customerID: string): SavingAccount[] {
    return SavingAccount.savings.filter((saving) => saving.customerId === customerID);
  }

  softDeleteAccount(accountId: string): void {
    this.getAccountById(accountId).updateStatusBeforeSoftDelete();
  }

  createSavingAccount(createSavingAccountDTO: CreateBankAccountDTO): SavingAccount {
    console.log(`createBankAccountDTO no saving service: ${JSON.stringify(createSavingAccountDTO)}`);
    const savingAccount = SavingAccountFactory.create(createSavingAccountDTO);
    this.customerService.getCustomerById(createSavingAccountDTO.customerId).accountsIds.push(savingAccount.id);
    return savingAccount;
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
    if (amount > account.balance) {
      throw this.appErrorService.createError(ErrorMessage.INVALID_AMOUNT_OR_INSIFICIENT_BALANCE, ErrorContext.WITHDRAW);
    }
    account.balance -= amount;
  }
}
