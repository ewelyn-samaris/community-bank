import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BankAccount } from '../entities/bank-account/bank-account.entity';
import { CheckingAccount } from '../entities/bank-account/checking-account.entity';
import { SavingAccount } from '../entities/bank-account/saving-account.entity';
import { UpdateBankAccountTypeDTO } from '../../application/dtos/update-bank-account.dto';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { BankAccountFactory } from '../factories/bank-account/bank-account.factory';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { AccountType } from '../enums/account-type.enum';
import { IBankAccountRepository } from '../../infrastructure/interfaces/bank-account-repository.interface';

@Injectable()
export class BankAccountService implements IBankAccountService {
  constructor(
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
    @Inject('ISavingAccountRepository') private readonly savingAccountRepository: IBankAccountRepository<SavingAccount>,
    @Inject('ICheckingAccountRepository')
    private readonly checkingAccountRepository: IBankAccountRepository<CheckingAccount>,
  ) {}

  private CreateBankAccountDtoFromUpdate(
    accountType: AccountType,
    balance: number,
    customerId: string,
  ): CreateBankAccountDTO {
    const initialBalance = balance;
    return { customerId, accountType, initialBalance };
  }

  async save(account: BankAccount): Promise<BankAccount> {
    if (account instanceof SavingAccount) {
      return await this.savingAccountRepository.save(account);
    }
    return await this.checkingAccountRepository.save(account as CheckingAccount);
  }

  async getAll(): Promise<BankAccount[]> {
    const checkings: CheckingAccount[] = await this.checkingAccountRepository.findAll();
    const savings: SavingAccount[] = await this.savingAccountRepository.findAll();
    const accounts = [...savings, ...checkings];

    if (!accounts.length) {
      throw new NotFoundException(`No bank account found in the database`);
    }
    return accounts;
  }

  async getAccountById(accountId: string): Promise<BankAccount> {
    let account: BankAccount = await this.checkingAccountRepository.findOneById(accountId);
    if (account) {
      return account;
    }

    account = await this.savingAccountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(`Not found bank account with the given Id #${accountId}`);
    }
    return account;
  }

  async getAccountsByCustomerId(customerId: string): Promise<BankAccount[]> {
    const savings = await this.savingAccountRepository.findByCustomerId(customerId);
    const checkings = await this.checkingAccountRepository.findByCustomerId(customerId);
    const accounts: BankAccount[] = [...savings, ...checkings];

    if (!accounts.length) {
      throw new NotFoundException(`Not found bank account for the given customerId #${customerId}`);
    }
    return accounts;
  }

  async createBankAccount(createBankAccountDto: CreateBankAccountDTO): Promise<BankAccount> {
    const customer = await this.iCustomerService.getCustomerById(createBankAccountDto.customerId);
    try {
      const account = BankAccountFactory.create(createBankAccountDto, customer);
      return await this.save(account);
    } catch (error) {
      throw new InternalServerErrorException(`Can't create/modify bank account. Internal server error: ${error}`);
    }
  }

  async modifyAccountType(updateBankAccountTypeDto: UpdateBankAccountTypeDTO, accountId: string): Promise<BankAccount> {
    const currentAccount = await this.getAccountById(accountId);
    const createBankAccountDto: CreateBankAccountDTO = this.CreateBankAccountDtoFromUpdate(
      updateBankAccountTypeDto.accountTypeToChangeTo,
      currentAccount.balance,
      currentAccount.customer.id,
    );
    const bankAccount: BankAccount = await this.createBankAccount(createBankAccountDto);
    this.softRemoveAccount(currentAccount);
    return bankAccount;
  }

  async softRemoveAccount(account: BankAccount): Promise<void> {
    try {
      account.balance = 0;
      account instanceof SavingAccount
        ? await this.savingAccountRepository.softRemove(account as SavingAccount)
        : await this.checkingAccountRepository.softRemove(account as CheckingAccount);
      await this.save(account);
    } catch (error) {
      throw new InternalServerErrorException(`Can't delete bank account. Internal server error`);
    }
  }
}
