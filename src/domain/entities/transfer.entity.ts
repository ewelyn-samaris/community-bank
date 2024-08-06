import { CreateTransactionDTO } from 'src/application/dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';

export class Transfer extends Transaction {
  destinationAccountId: string;

  constructor(createTransactionDto: CreateTransactionDTO) {
    super(createTransactionDto);
    this.destinationAccountId = createTransactionDto.destinationAccountId;
    Transaction.transactions.push(this);
  }
}
