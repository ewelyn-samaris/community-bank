import { Injectable } from '@nestjs/common';
import { ManagedRegion } from '../../enums/managed-regions.enum';
import { IAccountManagerService } from '../../interfaces/functionary/account-manager-service.interface';
import { AccountManager } from '../../entities/functionary/account-manager.entity';
import 'dotenv/config';

@Injectable()
export class AccountManagerService implements IAccountManagerService {
  getManagers(): AccountManager[] {
    return AccountManager.managers;
  }

  getManagerByRegion(region: ManagedRegion): AccountManager {
    return AccountManager.managers.find((manager) => manager.managedRegion === region);
  }
}
