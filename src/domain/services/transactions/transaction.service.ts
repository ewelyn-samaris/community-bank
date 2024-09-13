import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Transaction } from '../../entities/transaction/transaction.entity';
import { TransactionFactory } from '../../factories/transaction/transaction.factory';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { ITransactionService } from '../../interfaces/transaction/transaction-service.interface';
import { IBankAccountService } from '../../interfaces/bank-account-service.interface';
import { TransactionType } from '../../enums/transaction-type.enum';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from '../../interfaces/transaction/transaction.interface';
import { Customer } from '../../entities/customer/customer.entity';
import { ICustomerService } from '../../interfaces/customer-service.interface';
import { ITransactionRepository } from '../../../infrastructure/interfaces/transaction-repository.interface';

@Injectable()
export class TransactionService implements ITransactionService {
  private DEFAULT_BANK_STATEMENT_LIMIT: number = 5;

  constructor(
    @Inject('ITransactionRepository') private readonly iTransactionRepository: ITransactionRepository,
    @Inject('ICustomerService') private readonly icustomerService: ICustomerService,
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('IWithdrawService') private readonly iWithdrawService: ITransaction,
    @Inject('IDepositService') private readonly iDepositService: ITransaction,
    @Inject('ITransferService') private readonly iTransferService: ITransaction,
  ) {}

  private async save(transaction: Transaction): Promise<Transaction> {
    return await this.iTransactionRepository.save(transaction);
  }

  private createTransaction(
    createTransactionDTO: CreateTransactionDTO,
    customer: Customer,
    account: BankAccount,
    destinationAccount?: BankAccount,
  ): Transaction {
    return TransactionFactory.create(createTransactionDTO, customer, account, destinationAccount);
  }

  private processTransaction(account: BankAccount, amount: number, destinationAccount?: BankAccount) {
    return {
      WITHDRAW: () => this.iWithdrawService.process(account, amount),
      DEPOSIT: () => this.iDepositService.process(account, amount),
      TRANSFER: () => this.iTransferService.process(account, amount, destinationAccount),
    };
  }

  async getLastTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions = await this.iTransactionRepository.findByAccountId(accountId);
    if (!transactions.length) {
      throw new NotFoundException(`No transactions found for the given accountId #${accountId}`);
    }
    return transactions.slice(-this.DEFAULT_BANK_STATEMENT_LIMIT);
  }

  async execute(createTransactionDto: CreateTransactionDTO): Promise<Transaction> {
    const customer = await this.icustomerService.getCustomerById(createTransactionDto.customerId);
    const account = await this.iBankAccountService.getAccountById(createTransactionDto.accountId);
    const destinationAccount = createTransactionDto.destinationAccountId
      ? await this.iBankAccountService.getAccountById(createTransactionDto.destinationAccountId)
      : null;

    this.processTransaction(account, createTransactionDto.amount, destinationAccount)[createTransactionDto.type]();
    try {
      const transaction = this.createTransaction(createTransactionDto, customer, account, destinationAccount);
      await this.save(transaction);

      account.transactions.push(transaction);
      await this.iBankAccountService.save(account);

      if (transaction.type === TransactionType.TRANSFER) {
        destinationAccount.transactions.push(transaction);
        await this.iBankAccountService.save(destinationAccount);
      }

      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(`Cant process transaction. Internal server error: ${error}`);
    }
  }
}
