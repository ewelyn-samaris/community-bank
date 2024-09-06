import { Injectable } from '@nestjs/common';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { FunctionaryFactory } from '../factories/functionary.factory';
import { Administrator } from '../entities/administrator.entity';

@Injectable()
export class AdministratorService {
  getAdministrators(): Administrator[] {
    return Administrator.administrators;
  }

  createAdministrator(createFunctionaryDTO: CreateFunctionaryDTO): Administrator {
    const administrator: Administrator = FunctionaryFactory.createFunctionary(createFunctionaryDTO);
    return administrator;
  }
}
