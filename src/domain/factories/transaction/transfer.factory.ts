import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { Transfer } from '../../entities/transaction/transfer.entity';

export abstract class TransferFactory {
  static create(createTransferDto: CreateTransactionDTO): Transfer {
    return new Transfer(createTransferDto);
  }
}
