import { Functionary } from '../../entities/functionary/functionary.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { OfficeTypes } from '../../enums/office-types.enum';
import { AccountManagerFactory } from './account-manager.factory';
import { AdministratorFactory } from './administrator.factory';

export abstract class FunctionaryFactory {
  static createFunctionary(functionaryDTO: CreateFunctionaryDTO): Functionary {
    if (functionaryDTO.office === OfficeTypes.ACCOUNT_MANAGER) {
      return AccountManagerFactory.create(functionaryDTO);
    }
    return AdministratorFactory.create(functionaryDTO);
  }
}
