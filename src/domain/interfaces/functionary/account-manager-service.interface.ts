import { AccountManager } from '../../entities/functionary/account-manager.entity';
import { ManagedRegion } from '../../enums/managed-regions.enum';

export interface IAccountManagerService {
  getManagers(): AccountManager[];
  getManagerByRegion(region: ManagedRegion): AccountManager;
}
