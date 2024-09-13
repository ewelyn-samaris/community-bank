import { ChildEntity } from 'typeorm';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Payment } from './payment.entity';
import { Customer } from '../customer/customer.entity';
import { BankAccount } from '../bank-account/bank-account.entity';

@ChildEntity()
export class Pix extends Payment {
  constructor(
    createPixPaymentDto: CreatePaymentDto,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ) {
    super(createPixPaymentDto, customer, account, destinationAccount);
  }
}
