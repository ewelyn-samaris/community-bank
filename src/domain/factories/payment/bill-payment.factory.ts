import { Customer } from '../../entities/customer/customer.entity';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Bill } from '../../entities/payment/bill.entity';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export abstract class BillPaymentFactory {
  static create(
    createBillPaymentDto: CreatePaymentDto,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ): Bill {
    return new Bill(createBillPaymentDto, customer, account, destinationAccount);
  }
}
