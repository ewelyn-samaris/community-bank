import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingAccount } from '../../domain/entities/bank-account/saving-account.entity';
import { IBankAccountRepository } from '../interfaces/bank-account-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class SavingAccountRepository implements IBankAccountRepository<SavingAccount> {
  constructor(
    @InjectRepository(SavingAccount)
    private readonly savingAccountRepository: Repository<SavingAccount>,
  ) {}

  async save(savingAccount: SavingAccount): Promise<SavingAccount> {
    return await this.savingAccountRepository.save(savingAccount);
  }

  async findAll(): Promise<SavingAccount[]> {
    return await this.savingAccountRepository.find();
  }

  async findOneById(id: string): Promise<SavingAccount> {
    return await this.savingAccountRepository.findOne({ where: { id } });
  }

  async findByCustomerId(customerId: string): Promise<SavingAccount[]> {
    return await this.savingAccountRepository.find({ where: { customer: { id: customerId } } });
  }

  async softRemove(account: SavingAccount): Promise<void> {
    await this.savingAccountRepository.softRemove(account);
  }
}
