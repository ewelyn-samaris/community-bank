import { Pix } from '../../entities/payment/pix.entity';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Customer } from '../../entities/customer/customer.entity';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export abstract class PixPaymentFactory {
  static create(
    createPixPaymentDto: CreatePaymentDto,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ): Pix {
    return new Pix(createPixPaymentDto, customer, account, destinationAccount);
  }
}
