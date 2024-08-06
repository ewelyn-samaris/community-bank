import { TransactionType } from '../enums/transaction-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateTransactionDTO } from 'src/application/dtos/create-transaction.dto';

export abstract class Transaction {
  static transactions: Transaction[] = [];
  id: string;
  type: TransactionType;
  amount: number;
  createdAt: Date;
  customerId: string;
  accountId: string;

  constructor(createTransactionDto: CreateTransactionDTO) {
    this.id = uuidv4();
    this.customerId = createTransactionDto.customerId;
    this.type = createTransactionDto.type;
    this.amount = createTransactionDto.amount;
    this.accountId = createTransactionDto.accountId;
    this.createdAt = new Date();
  }
}
