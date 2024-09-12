import { StatusType } from '../../enums/status-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { AccountType } from '../../enums/account-type.enum';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';

export abstract class BankAccount {
  id: string;
  type: AccountType;
  balance: number;
  status: StatusType;
  createdAt: Date;
  customerId: string;
  transactionsIds: string[] = [];
  paymentsIds: string[] = [];
  updatedAt: Date;
  deletedAt?: Date;

  constructor(createBankAccountDto: CreateBankAccountDTO) {
    this.id = uuidv4();
    this.customerId = createBankAccountDto.customerId;
    this.type = createBankAccountDto.accountType;
    this.balance = createBankAccountDto.initialBalance ?? 0;
    this.status = StatusType.ACTIVE;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
