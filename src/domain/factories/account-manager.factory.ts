import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { AccountManager } from '../entities/account-manager.entity';

export abstract class AccountManagerFactory {
  static create(createAccountManagerDTO: CreateFunctionaryDTO): AccountManager {
    return new AccountManager(createAccountManagerDTO);
  }
}
