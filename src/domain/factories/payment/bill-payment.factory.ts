import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Bill } from '../../entities/payment/bill.entity';

export abstract class BillPaymentFactory {
  static create(createBillPaymentCommandData: CreatePaymentDto): Bill {
    return new Bill(createBillPaymentCommandData);
  }
}
