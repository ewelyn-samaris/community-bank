import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckingAccount } from '../../domain/entities/bank-account/checking-account.entity';
import { IBankAccountRepository } from '../interfaces/bank-account-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CheckingAccountRepository implements IBankAccountRepository<CheckingAccount> {
  constructor(
    @InjectRepository(CheckingAccount)
    private readonly checkingAccountRepository: Repository<CheckingAccount>,
  ) {}

  async save(checkingAccount: CheckingAccount): Promise<CheckingAccount> {
    return await this.checkingAccountRepository.save(checkingAccount);
  }

  async findAll(): Promise<CheckingAccount[]> {
    return await this.checkingAccountRepository.find();
  }

  async findOneById(id: string): Promise<CheckingAccount> {
    return await this.checkingAccountRepository.findOne({ where: { id } });
  }

  async findByCustomerId(customerId: string): Promise<CheckingAccount[]> {
    return await this.checkingAccountRepository.find({ where: { customer: { id: customerId } } });
  }

  async softRemove(account: CheckingAccount): Promise<void> {
    await this.checkingAccountRepository.softRemove(account);
  }
}
