import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { Payment } from '../../entities/payment/payment.entity';

export interface IPaymentService {
  getPaymentsByAccountId(accountId: string): Promise<Payment[]>;
  execute(createPaymentDto: CreatePaymentDto): Promise<Payment>;
}
