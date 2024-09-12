import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { IFunctionaryService } from '../../interfaces/functionary/functionary-service.interface';
import { IAccountManagerService } from '../../interfaces/functionary/account-manager-service.interface';
import { IAdministratorService } from '../../interfaces/functionary/administrator-service.interface';
import { FunctionaryFactory } from '../../factories/functionary/functionary.factory';
import { Functionary } from '../../entities/functionary/functionary.entity';
import { Administrator } from '../../entities/functionary/administrator.entity';
import { AccountManager } from '../../entities/functionary/account-manager.entity';

@Injectable()
export class FunctionaryService implements IFunctionaryService {
  constructor(
    @Inject('IAdministratorService') private readonly iAdministratorService: IAdministratorService,
    @Inject('IAccountManagerService') private readonly iAccountManagerService: IAccountManagerService,
  ) {}

  getFunctionaries(): Functionary[] {
    const administrators: Administrator[] = this.iAdministratorService.getAdministrators();
    const managers: AccountManager[] = this.iAccountManagerService.getManagers();
    return [...administrators, ...managers];
  }

  getFunctionaryByCpf(cpf: string): Functionary {
    const functionaries = this.getFunctionaries();
    if (functionaries.length) {
      return functionaries.find((functionary) => functionary.cpf === cpf);
    }
  }

  createFunctionary(createFunctionaryDTO: CreateFunctionaryDTO): Functionary {
    try {
      return FunctionaryFactory.createFunctionary(createFunctionaryDTO);
    } catch (error) {
      throw new InternalServerErrorException(`Cant create functionary. Internal Server Error: ${error}`);
    }
  }
}
