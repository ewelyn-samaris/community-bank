import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountManager } from '../../domain/entities/functionary/account-manager.entity';
import { ManagedRegion } from '../../domain/enums/managed-regions.enum';
import { IAccountManagerRepository } from '../interfaces/account-manager-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AccountManagerRepository implements IAccountManagerRepository {
  constructor(
    @InjectRepository(AccountManager)
    private readonly accountManagerRepository: Repository<AccountManager>,
  ) {}

  async save(manager: AccountManager): Promise<AccountManager> {
    return await this.accountManagerRepository.save(manager);
  }

  async findAll(): Promise<AccountManager[]> {
    return await this.accountManagerRepository.find();
  }

  async findOneByRegion(region: ManagedRegion): Promise<AccountManager> {
    return await this.accountManagerRepository.findOne({ where: { managedRegion: region } });
  }

  async findOneByCpf(cpf: string): Promise<AccountManager> {
    return await this.accountManagerRepository.findOne({ where: { cpf } });
  }
}
