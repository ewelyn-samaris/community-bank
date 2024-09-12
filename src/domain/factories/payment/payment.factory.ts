import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { BillPaymentFactory } from './bill-payment.factory';
import { PixPaymentFactory } from './pix-payment.factory';
import { Payment } from '../../entities/payment/payment.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class PaymentFactory {
  static create(createPaymentCommandData: CreatePaymentDto): Payment {
    try {
      const paymentStrategyFactories = {
        PIX: PixPaymentFactory,
        BILL: BillPaymentFactory,
      };
      const paymentStrategyFactory = paymentStrategyFactories[createPaymentCommandData.paymentStrategy];
      return paymentStrategyFactory.create(createPaymentCommandData);
    } catch (error) {
      throw new InternalServerErrorException(`Can't process payment. Internal server error: ${error}`);
    }
  }
}
