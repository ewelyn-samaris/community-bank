import { Inject, Injectable } from '@nestjs/common';
import { ManagedRegion } from '../../enums/managed-regions.enum';
import { IAccountManagerService } from '../../interfaces/functionary/account-manager-service.interface';
import { AccountManager } from '../../entities/functionary/account-manager.entity';
import { IAccountManagerRepository } from '../../../infrastructure/interfaces/account-manager-repository.interface';

@Injectable()
export class AccountManagerService implements IAccountManagerService {
  constructor(
    @Inject('IAccountManagerRepository') private readonly iAccountManagerRepository: IAccountManagerRepository,
  ) {}

  async save(manager: AccountManager): Promise<AccountManager> {
    return await this.iAccountManagerRepository.save(manager);
  }

  async getManagers(): Promise<AccountManager[]> {
    return await this.iAccountManagerRepository.findAll();
  }

  async getManagerByRegion(region: ManagedRegion): Promise<AccountManager> {
    return await this.iAccountManagerRepository.findOneByRegion(region);
  }

  async getManagerByCpf(cpf: string): Promise<AccountManager> {
    return await this.iAccountManagerRepository.findOneByCpf(cpf);
  }
}
