import { Administrator } from '../../entities/functionary/administrator.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';

export abstract class AdministratorFactory {
  static create(createAdministratorDTO: CreateFunctionaryDTO): Administrator {
    return new Administrator(createAdministratorDTO);
  }
}
