import { StatusType } from '../../enums/status-type.enum';
import { AccountType } from '../../enums/account-type.enum';
import { CreateBankAccountDTO } from '../../../application/dtos/create-bank-account.dto';
import { Customer } from '../customer/customer.entity';
import { Payment } from '../payment/payment.entity';
import { Transaction } from '../transaction/transaction.entity';
import { BeforeSoftRemove, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: AccountType;

  @Column({ default: 0 })
  balance: number;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ACTIVE })
  status: StatusType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.account, { nullable: true })
  transactions: Transaction[];

  @OneToMany(() => Payment, (payment) => payment.account, { nullable: true })
  payments: Payment[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(createBankAccountDto?: CreateBankAccountDTO, customer?: Customer) {
    if (customer) this.customer = customer;
    if (createBankAccountDto) {
      this.type = createBankAccountDto?.accountType;
      this.balance = createBankAccountDto?.initialBalance ?? 0;
    }
  }

  @BeforeSoftRemove()
  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
