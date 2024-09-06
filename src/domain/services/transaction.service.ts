import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionFactory } from '../factories/transaction.factory';
import { CreateTransactionDTO } from '../../application/dtos/create-transaction.dto';
import { BankAccountService } from '../services/bank-account.service';

@Injectable()
export class TransactionService {
  private DEFAULT_BANK_STATEMENT_LIMIT: number = 5;

  constructor(private readonly bankAccountService: BankAccountService) {}

  private getTransactions(): Transaction[] {
    return Transaction.transactions;
  }

  private createTransaction(createTransactionDTO: CreateTransactionDTO): Transaction {
    return TransactionFactory.create(createTransactionDTO);
  }

  getTransactionsByAccountID(accountId: string): Transaction[] {
    return this.getTransactions().filter((transaction) => transaction.accountId === accountId);
  }

  getTransactionByID(transactionID: string): Transaction {
    return this.getTransactions().find((transaction) => transaction.id === transactionID);
  }

  getLastTransactionsByAccountID(accountID: string): Transaction[] {
    return this.getTransactionsByAccountID(accountID).slice(-this.DEFAULT_BANK_STATEMENT_LIMIT);
  }

  deposit(accountId: string, amount: number): void {
    this.bankAccountService.deposit(accountId, amount);
  }

  withdraw(accountId: string, amount: number): void {
    this.bankAccountService.withdraw(accountId, amount);
  }

  transfer(originAccountID: string, destinationAccountID: string, amount: number): void {
    this.bankAccountService.transfer(originAccountID, destinationAccountID, amount);
  }

  execute(createTransactionDTO: CreateTransactionDTO): Transaction {
    const transactionsTypes = {
      WITHDRAW: (createTransactionDTO: CreateTransactionDTO) =>
        this.withdraw(createTransactionDTO.accountId, createTransactionDTO.amount),
      DEPOSIT: (createTransactionDTO: CreateTransactionDTO) =>
        this.deposit(createTransactionDTO.accountId, createTransactionDTO.amount),
      TRANSFER: (createTransactionDTO: CreateTransactionDTO) =>
        this.transfer(
          createTransactionDTO.accountId,
          createTransactionDTO.destinationAccountId,
          createTransactionDTO.amount,
        ),
    };

    transactionsTypes[createTransactionDTO.type](createTransactionDTO);
    return this.createTransaction(createTransactionDTO);
  }
}
