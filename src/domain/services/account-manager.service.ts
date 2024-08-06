import { Injectable } from '@nestjs/common';
import { AccountManager } from '../entities/account-manager.entity';
import { ManagedRegion } from '../enums/managed-regions.enum';
import { FunctionaryFactory } from '../factories/functionary.factory';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import 'dotenv/config';

@Injectable()
export class AccountManagerService {
  getManagers(): AccountManager[] {
    return AccountManager.managers;
  }

  getManagerByRegion(region: ManagedRegion): AccountManager {
    return AccountManager.managers.find((manager) => manager.managedRegion === region);
  }

  createManager(createFunctionaryDTO: CreateFunctionaryDTO): AccountManager {
    const manager: AccountManager = FunctionaryFactory.createFunctionary(createFunctionaryDTO) as AccountManager;
    return manager;
  }
}
