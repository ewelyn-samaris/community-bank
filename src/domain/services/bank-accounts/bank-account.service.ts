import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { CheckingAccount } from '../../entities/bank-account/checking-account.entity';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { UpdateBankAccountTypeDTO } from '../../../application/dtos/update-bank-account.dto';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { BankAccountFactory } from '../../factories/bank-account/bank-account.factory';
import { IBankAccountService } from '../../interfaces/bank-account-service.interface';
import { ICustomerService } from '../../interfaces/customer-service.interface';
import { AccountType } from '../../enums/account-type.enum';
import { CheckingAccountService } from './checking-account.service';
import { SavingAccountService } from './saving-account.service';
import 'dotenv/config';

@Injectable()
export class BankAccountService implements IBankAccountService {
  constructor(
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
    private readonly checkingAccountService: CheckingAccountService,
    private readonly savingAccountService: SavingAccountService,
  ) {}

  private CreateBankAccountDtoFromUpdate(
    accountType: AccountType,
    balance: number,
    customerId: string,
  ): CreateBankAccountDTO {
    const initialBalance = balance;
    return { customerId, accountType, initialBalance };
  }

  getAll(): BankAccount[] {
    const checkings: CheckingAccount[] = this.checkingAccountService.getAll();
    const savings: SavingAccount[] = this.savingAccountService.getAll();
    return [...savings, ...checkings];
  }

  getAccountsByCustomerID(customerId: string): BankAccount[] {
    const accounts: BankAccount[] = this.getAll().filter((account) => account.customerId === customerId);

    if (!accounts.length) {
      throw new NotFoundException(`Not found bank account for the given customerId #${customerId}`);
    }
    return accounts;
  }

  getAccountById(accountId: string): BankAccount {
    return this.getAll()?.find((account) => account.id === accountId);
  }

  createBankAccount(createBankAccountDTO: CreateBankAccountDTO): BankAccount {
    const customer = this.iCustomerService.getCustomerById(createBankAccountDTO.customerId);
    try {
      const account = BankAccountFactory.create(createBankAccountDTO, customer.averageCapital);
      customer.accountsIds.push(account.id);
      return account;
    } catch (error) {
      throw new InternalServerErrorException(`Can't create bank account. Internal server error: ${error}`);
    }
  }

  modifyAccountType(updateBankAccountTypeDTO: UpdateBankAccountTypeDTO, accountId: string): BankAccount {
    const currentAccount = this.getAccountById(accountId);
    const createBankAccountDto: CreateBankAccountDTO = this.CreateBankAccountDtoFromUpdate(
      updateBankAccountTypeDTO.accountTypeToChangeTo,
      currentAccount.balance,
      currentAccount.customerId,
    );
    const bankAccount: BankAccount = this.createBankAccount(createBankAccountDto);
    if (!bankAccount) {
      throw new InternalServerErrorException(`Can't change bank account type. Internal server error`);
    }

    this.softDeleteAccount(currentAccount.id);
    return bankAccount;
  }

  softDeleteAccount(accountId: string): void {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new BadRequestException(`No bank-account found with the given id #${accountId}`);
    }

    try {
      account.balance = 0;
      account.updateStatusBeforeSoftDelete();
      account.deletedAt = new Date();
    } catch (error) {
      throw new InternalServerErrorException(`Can't delete bank account. Internal server error`);
    }
  }
}
