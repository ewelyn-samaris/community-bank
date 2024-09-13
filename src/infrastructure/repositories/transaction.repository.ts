import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction/transaction.entity';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({ where: { account: { id: accountId } } });
  }
}
