import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CheckingAccountService } from './checking-account.service';
import { SavingAccountService } from './saving-account.service';
import { BankAccount } from '../entities/bank-account.entity';
import { CheckingAccount } from '../entities/checking-account.entity';
import { SavingAccount } from '../entities/saving-account.entity';
import { AccountType } from '../enums/account-type.enum';
import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import 'dotenv/config';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly savingAccountService: SavingAccountService,
    private readonly checkingAccountService: CheckingAccountService,
  ) {}

  private CreateBankAccountDtoFromUpdate(
    updateBankAccountTypeDTO: UpdateBankAccountTypeDTO,
    accountId: string,
  ): CreateBankAccountDTO {
    const initialBalance = this.getAccountById(accountId).balance;
    const accountType = updateBankAccountTypeDTO.accountTypeToChangeTo;
    const customerId = updateBankAccountTypeDTO.customerId;
    return { customerId, accountType, initialBalance };
  }

  getAllBankAccounts(): BankAccount[] {
    const checkings: CheckingAccount[] = this.checkingAccountService.getAccounts();
    const savings: SavingAccount[] = this.savingAccountService.getAccounts();
    return savings.concat(checkings);
  }

  getAccountsByCustomerID(customerID: string): BankAccount[] {
    const savings: SavingAccount[] = this.savingAccountService.getAccountsByCustomerID(customerID);
    const checkings: CheckingAccount[] = this.checkingAccountService.getAccountsByCustomerID(customerID);
    return savings.concat(checkings);
  }

  getAccountById(accountID: string): BankAccount {
    return this.getAllBankAccounts().find((account) => account.id === accountID);
  }

  softDeleteAccount(bankAccountID: string): void {
    if (this.getAccountById(bankAccountID).type === AccountType.CHECKING_ACCOUNT) {
      this.checkingAccountService.softDeleteAccount(bankAccountID);
      return;
    }
    this.savingAccountService.softDeleteAccount(bankAccountID);
  }

  modifyAccountType(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): BankAccount {
    try {
      const createBankAccountDTO: CreateBankAccountDTO = this.CreateBankAccountDtoFromUpdate(
        updateBankAccountTypeDTO,
        accountId,
      );
      const bankAccount: BankAccount = this.createBankAccount(createBankAccountDTO);
      this.softDeleteAccount(accountId);
      return bankAccount;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  createBankAccount(createBankAccountDTO: CreateBankAccountDTO): CheckingAccount | SavingAccount {
    console.log(`createBankAccountDTO no bankAccountService: ${JSON.stringify(createBankAccountDTO)}`);
    if (createBankAccountDTO.accountType === AccountType.CHECKING_ACCOUNT) {
      return this.checkingAccountService.createCheckingAccount(createBankAccountDTO);
    }
    return this.savingAccountService.createSavingAccount(createBankAccountDTO);
  }

  deposit(accountID: string, amount: number): void {
    const account: BankAccount = this.getAccountById(accountID);

    if (account instanceof SavingAccount) {
      this.savingAccountService.deposit(accountID, amount);
    } else {
      this.checkingAccountService.deposit(accountID, amount);
    }
  }

  withdraw(accountID: string, amount: number): void {
    const account: BankAccount = this.getAccountById(accountID);

    if (account instanceof SavingAccount) {
      this.savingAccountService.withdraw(accountID, amount);
    } else {
      this.checkingAccountService.withdraw(accountID, amount);
    }
  }

  transfer(originAccountID: string, destinationAccountID: string, amount: number): void {
    this.withdraw(originAccountID, amount);
    this.deposit(destinationAccountID, amount);
  }
}
