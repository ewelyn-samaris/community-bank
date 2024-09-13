import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Payment } from '../../entities/payment/payment.entity';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { IPaymentService } from '../../interfaces/payment/payment-service.interface';
import { IPaymentStrategy } from '../../interfaces/payment/payment-strategy.interface';
import { PaymentStrategy } from '../../enums/payment-strategy.enum';
import { IBankAccountService } from '../../interfaces/bank-account-service.interface';
import { PaymentFactory } from '../../factories/payment/payment.factory';
import { BankAccount } from '../../entities/bank-account/bank-account.entity';
import { Customer } from '../../entities/customer/customer.entity';
import { ICustomerService } from '../../interfaces/customer-service.interface';
import { IPaymentRepository } from '../../../infrastructure/interfaces/payments-repository.interface';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject('IPaymentRepository') private readonly iPaymentRepository: IPaymentRepository,
    @Inject('ICustomerService') private readonly icustomerService: ICustomerService,
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('PixPaymentService') private readonly pixPaymentService: IPaymentStrategy,
    @Inject('BillPaymentService') private readonly billPaymentService: IPaymentStrategy,
  ) {}
  private createPayment(
    createPaymentDto: CreatePaymentDto,
    customer: Customer,
    account: BankAccount,
    destinationAccount?: BankAccount,
  ): Payment {
    return PaymentFactory.create(createPaymentDto, customer, account, destinationAccount);
  }

  private async save(payment: Payment): Promise<Payment> {
    return await this.iPaymentRepository.save(payment);
  }

  async getPaymentsByAccountId(accountId: string): Promise<Payment[]> {
    const payments = await this.iPaymentRepository.findByAccountId(accountId);
    if (!payments.length) {
      throw new NotFoundException(`No payments found for the given accountId #${accountId}`);
    }
    return payments;
  }

  async execute(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const customer: Customer = await this.icustomerService.getCustomerById(createPaymentDto.customerId);
    const account = await this.iBankAccountService.getAccountById(createPaymentDto.accountId);
    const destinationAccount = await this.iBankAccountService.getAccountById(createPaymentDto.beneficiaryAccountId);
    const paymentStrategy =
      createPaymentDto.paymentStrategy === PaymentStrategy.PIX ? this.pixPaymentService : this.billPaymentService;

    paymentStrategy.process(account, destinationAccount, createPaymentDto.amount);

    try {
      const payment = this.createPayment(createPaymentDto, customer, account, destinationAccount);
      await this.save(payment);
      account.payments.push(payment);
      await this.iBankAccountService.save(account);
      return payment;
    } catch (error) {
      throw new InternalServerErrorException(`Can't process payment. Internal server error`);
    }
  }
}
