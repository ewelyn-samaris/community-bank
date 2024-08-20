import { Pix } from '../../entities/payment/pix.entity';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';

export abstract class PixPaymentFactory {
  static create(createPixPaymentDto: CreatePaymentDto): Pix {
    return new Pix(createPixPaymentDto);
  }
}
