import { ManagedRegion } from '../../domain/enums/managed-regions.enum';
import { AccountManager } from '../../domain/entities/functionary/account-manager.entity';
import { IRepository } from './repository.interface';

export interface IAccountManagerRepository extends IRepository<AccountManager> {
  findOneByRegion(region: ManagedRegion): Promise<AccountManager>;
  findOneByCpf(cpf: string): Promise<AccountManager>;
}
