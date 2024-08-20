import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Payment } from './payment.entity';

export class Bill extends Payment {
  billCode: string;

  constructor(createPaymentDto: CreatePaymentDto) {
    super(createPaymentDto);
    this.billCode = createPaymentDto.billCode;
    Payment.payments.push(this);
  }
}
