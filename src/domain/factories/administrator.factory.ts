import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { Administrator } from '../entities/administrator.entity';

export abstract class AdministratorFactory {
  static create(createAdministratorDTO: CreateFunctionaryDTO): Administrator {
    return new Administrator(createAdministratorDTO);
  }
}
