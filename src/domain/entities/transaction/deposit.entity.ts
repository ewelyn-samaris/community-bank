import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';

export class Deposit extends Transaction {
  constructor(createTransactionDto: CreateTransactionDTO) {
    super(createTransactionDto);
    Transaction.transactions.push(this);
  }
}
