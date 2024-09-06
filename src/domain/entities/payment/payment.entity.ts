import { PaymentStrategy } from '../../enums/payment-strategy.enum';
import { v4 as uuidv4 } from 'uuid';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';

export abstract class Payment {
  static payments: Payment[] = [];
  id: string;
  amount: number;
  status: TransactionStatus;
  customerId: string;
  beneficiaryAccountId: string;
  accountId: string;
  paymentStrategy: PaymentStrategy;
  description?: string;
  createdAt: Date;
  payedAt?: Date;
  finishedAt?: Date;

  constructor(createPaymentDto: CreatePaymentDto) {
    this.id = uuidv4();
    this.amount = createPaymentDto.amount;
    this.status = TransactionStatus.PROCESSED;
    this.description = createPaymentDto.description.toUpperCase() ?? null;
    this.customerId = createPaymentDto.customerId;
    this.beneficiaryAccountId = createPaymentDto.beneficiaryAccountId;
    this.accountId = createPaymentDto.accountId;
    this.paymentStrategy = createPaymentDto.paymentStrategy;
    this.createdAt = new Date();
  }
}
