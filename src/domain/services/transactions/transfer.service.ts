import { Inject, Injectable } from '@nestjs/common';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { ITransaction } from 'src/domain/interfaces/transaction/transaction.interface';

@Injectable()
export class TransferService implements ITransaction {
  constructor(
    @Inject('IWithdrawService') private readonly iWithdrawService: ITransaction,
    @Inject('IDepositService') private readonly iDepositService: ITransaction,
  ) {}

  process(originAccount: BankAccount, amount: number, destinationAccount: BankAccount): void {
    this.iWithdrawService.process(originAccount, amount);
    this.iDepositService.process(destinationAccount, amount);
  }
}
