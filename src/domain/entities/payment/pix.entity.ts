import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Payment } from './payment.entity';

export class Pix extends Payment {
  pixCode: string;

  constructor(createPixPaymentDto: CreatePaymentDto) {
    super(createPixPaymentDto);
    this.pixCode = createPixPaymentDto.pixCode;
    Payment.payments.push(this);
  }
}
