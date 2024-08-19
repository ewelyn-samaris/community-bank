import { AccountManager } from '../../entities/functionary/account-manager.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';

export abstract class AccountManagerFactory {
  static create(createAccountManagerDTO: CreateFunctionaryDTO): AccountManager {
    return new AccountManager(createAccountManagerDTO);
  }
}
