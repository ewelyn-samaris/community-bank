import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../domain/entities/payment/payment.entity';
import { IPaymentRepository } from '../interfaces/payments-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async save(payment: Payment): Promise<Payment> {
    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }

  async findByAccountId(accountId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({ where: { account: { id: accountId } } });
  }
}
