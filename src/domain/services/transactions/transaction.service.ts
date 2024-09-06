import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Transaction } from '../../entities/transaction/transaction.entity';
import { TransactionFactory } from '../../factories/transaction/transaction.factory';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { ITransactionService } from '../../interfaces/transaction/transaction-service.interface';
import { IBankAccountService } from '../../interfaces/bank-account-service.interface';
import { TransactionType } from '../../enums/transaction-type.enum';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from '../../interfaces/transaction/transaction.interface';

@Injectable()
export class TransactionService implements ITransactionService {
  private DEFAULT_BANK_STATEMENT_LIMIT: number = 5;

  constructor(
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('IWithdrawService') private readonly iWithdrawService: ITransaction,
    @Inject('IDepositService') private readonly iDepositService: ITransaction,
    @Inject('ITransferService') private readonly iTransferService: ITransaction,
  ) {}

  private getTransactions(): Transaction[] {
    const transactions = Transaction.transactions;
    if (!transactions.length) {
      throw new NotFoundException(`No transactions found`);
    }
    return transactions;
  }

  private createTransaction(createTransactionCommandData: CreateTransactionDTO): Transaction {
    return TransactionFactory.create(createTransactionCommandData);
  }

  private getTransactionsByAccountId(accountId: string): Transaction[] {
    const transactions = this.getTransactions().filter((transaction) => transaction.accountId === accountId);
    if (!transactions.length) {
      throw new NotFoundException(`No transactions found for the given accountId #${accountId}`);
    }
    return transactions;
  }

  private processTransaction(account: BankAccount, amount: number, destinationAccount?: BankAccount) {
    return {
      WITHDRAW: () => this.iWithdrawService.process(account, amount),
      DEPOSIT: () => this.iDepositService.process(account, amount),
      TRANSFER: () => this.iTransferService.process(account, amount, destinationAccount),
    };
  }

  getLastTransactionsByAccountID(accountID: string): Transaction[] {
    return this.getTransactionsByAccountId(accountID).slice(-this.DEFAULT_BANK_STATEMENT_LIMIT);
  }

  execute(createTransactionDto: CreateTransactionDTO): Transaction {
    const account = this.iBankAccountService.getAccountById(createTransactionDto.accountId);
    const destinationAccount = createTransactionDto.destinationAccountId
      ? this.iBankAccountService.getAccountById(createTransactionDto.destinationAccountId)
      : null;

    this.processTransaction(account, createTransactionDto.amount, destinationAccount)[createTransactionDto.type]();
    try {
      const transaction = this.createTransaction(createTransactionDto);
      account.transactionsIds.push(transaction.id);

      if (createTransactionDto.type === TransactionType.TRANSFER) {
        destinationAccount.transactionsIds.push(transaction.id);
      }

      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(`Cant process transaction. Internal server error: ${error}`);
    }
  }
}
