import { Injectable } from '@nestjs/common';
import { Functionary } from '../entities/functionary.entity';
import { AccountManagerService } from './account-manager.service';
import { AdministratorService } from './administrator.service';
import { Administrator } from '../entities/administrator.entity';
import { AccountManager } from '../entities/account-manager.entity';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { OfficeTypes } from '../enums/office-types.enum';

@Injectable()
export class FunctionaryService {
  constructor(
    private readonly administratorService: AdministratorService,
    private readonly accountManagerService: AccountManagerService,
  ) {}

  getFunctionaries(): Functionary[] {
    const administrators: Administrator[] = this.administratorService.getAdministrators();
    const managers: AccountManager[] = this.accountManagerService.getManagers();
    return administrators.concat(managers);
  }

  getFunctionaryByCpf(cpf: string): Functionary {
    return this.getFunctionaries().find((functionary) => functionary.cpf === cpf);
  }

  createFunctionary(createFunctionaryDTO: CreateFunctionaryDTO): Functionary {
    if (createFunctionaryDTO.office === OfficeTypes.ADMINISTRATOR) {
      return this.administratorService.createAdministrator(createFunctionaryDTO);
    }
    return this.accountManagerService.createManager(createFunctionaryDTO);
  }
}
