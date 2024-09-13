import { TransactionStatus } from '../../enums/transaction-status.enum';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { PaymentStrategy } from '../../enums/payment-strategy.enum';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Customer } from '../customer/customer.entity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { CreateDateColumn, ManyToOne } from 'typeorm';
import { TableInheritance, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PROCESSED })
  status: TransactionStatus;

  @Column({ type: 'enum', enum: PaymentStrategy })
  paymentStrategy: PaymentStrategy;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.payments)
  @JoinColumn({ name: 'destination_account_id' })
  destinationAccount: BankAccount;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.payments)
  @JoinColumn({ name: 'account_id' })
  account: BankAccount;

  @Column({ nullable: true })
  description?: string;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  payedAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    createPaymentDto?: CreatePaymentDto,
    customer?: Customer,
    account?: BankAccount,
    destinationAccount?: BankAccount,
  ) {
    if (createPaymentDto) {
      this.amount = createPaymentDto?.amount;
      this.description = createPaymentDto?.description.toUpperCase() ?? null;
      this.code = createPaymentDto?.code;
      this.paymentStrategy = createPaymentDto?.paymentStrategy;
    }
    if (customer) this.customer = customer;
    if (destinationAccount) this.destinationAccount = destinationAccount;
    if (account) this.account = account;
  }
}
