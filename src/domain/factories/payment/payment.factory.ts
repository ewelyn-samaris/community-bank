import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { BillPaymentFactory } from './bill-payment.factory';
import { PixPaymentFactory } from './pix-payment.factory';
import { Payment } from '../../entities/payment/payment.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Customer } from '../../entities/customer/customer.entity';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';

export class PaymentFactory {
  static create(
    createPaymentDto: CreatePaymentDto,
    customer: Customer,
    account: BankAccount,
    destinationAccount: BankAccount,
  ): Payment {
    const paymentStrategyFactories = {
      PIX: PixPaymentFactory,
      BILL: BillPaymentFactory,
    };
    const paymentStrategyFactory = paymentStrategyFactories[createPaymentDto.paymentStrategy];
    return paymentStrategyFactory.create(createPaymentDto, customer, account, destinationAccount);
  }
}
