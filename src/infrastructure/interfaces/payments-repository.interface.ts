import { Payment } from '../../domain/entities/payment/payment.entity';
import { IRepository } from './repository.interface';

export interface IPaymentRepository extends IRepository<Payment> {
  findByAccountId(accountId: string): Promise<Payment[]>;
}
