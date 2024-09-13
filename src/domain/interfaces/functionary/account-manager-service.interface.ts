import { AccountManager } from '../../entities/functionary/account-manager.entity';
import { ManagedRegion } from '../../enums/managed-regions.enum';

export interface IAccountManagerService {
  save(manager: AccountManager): Promise<AccountManager>;
  getManagers(): Promise<AccountManager[]>;
  getManagerByRegion(region: ManagedRegion): Promise<AccountManager>;
  getManagerByCpf(cpf: string): Promise<AccountManager>;
}
