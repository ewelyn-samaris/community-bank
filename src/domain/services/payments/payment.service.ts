import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Payment } from '../../entities/payment/payment.entity';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { IPaymentService } from '../../interfaces/payment/payment-service.interface';
import { IPaymentStrategy } from '../../interfaces/payment/payment-strategy.interface';
import { PaymentStrategy } from '../../enums/payment-strategy.enum';
import { IBankAccountService } from '../../interfaces/bank-account-service.interface';
import { PaymentFactory } from '../../factories/payment/payment.factory';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('PixPaymentService') private readonly pixPaymentService: IPaymentStrategy,
    @Inject('BillPaymentService') private readonly billPaymentService: IPaymentStrategy,
  ) {}
  private createPayment(createPaymentDto: CreatePaymentDto): Payment {
    return PaymentFactory.create(createPaymentDto);
  }

  private getAll(): Payment[] {
    const payments = Payment.payments;
    if (!payments.length) {
      throw new NotFoundException(`No payments found`);
    }
    return payments;
  }

  getPaymentsByAccountId(accountId: string): Payment[] {
    const payments = this.getAll().filter((payment) => payment.accountId === accountId);
    if (!payments.length) {
      throw new NotFoundException(`No payments found for the given accountId #${accountId}`);
    }
    return payments;
  }

  execute(createPaymentDto: CreatePaymentDto): Payment {
    const account = this.iBankAccountService.getAccountById(createPaymentDto.accountId);
    const beneficiaryAccount = this.iBankAccountService.getAccountById(createPaymentDto.beneficiaryAccountId);
    const paymentStrategy =
      createPaymentDto.paymentStrategy === PaymentStrategy.PIX ? this.pixPaymentService : this.billPaymentService;

    paymentStrategy.process(account, beneficiaryAccount, createPaymentDto.amount);

    try {
      const payment = this.createPayment(createPaymentDto);
      account.paymentsIds.push(payment.id);
      return payment;
    } catch (error) {
      throw new InternalServerErrorException(`Can't process payment. Internal server error`);
    }
  }
}
