import { StatusType } from '../enums/status-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './transaction.entity';
import { AccountType } from '../enums/account-type.enum';
import { CreateBankAccountDTO } from 'src/application/dtos/create-bank-account.dto';

export abstract class BankAccount {
  id: string;
  type: AccountType;
  balance: number;
  status: StatusType;
  createdAt: Date;
  customerId: string;
  fineshedAt?: Date;
  transactions?: Transaction[];

  constructor(createBankAccountDto: CreateBankAccountDTO) {
    this.id = uuidv4();
    this.customerId = createBankAccountDto.customerId;
    this.type = createBankAccountDto.accountType;
    this.balance = createBankAccountDto.initialBalance;
    this.status = StatusType.ACTIVE;
    this.createdAt = new Date();
  }
}
