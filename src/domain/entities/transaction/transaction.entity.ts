import { TransactionType } from '../../enums/transaction-type.enum';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { CreateTransactionDTO } from '../../../application/dtos/create-transaction.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Customer } from '../customer/customer.entity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { CreateDateColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity('transactions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  customer: Customer;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'account_id' })
  account: BankAccount;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PROCESSED })
  status: TransactionStatus;

  constructor(createTransactionDto?: CreateTransactionDTO, customer?: Customer, account?: BankAccount) {
    if (customer) this.customer = customer;
    if (account) this.account = account;
    if (createTransactionDto) {
      this.amount = createTransactionDto?.amount;
      this.type = createTransactionDto?.type;
    }
  }
}
