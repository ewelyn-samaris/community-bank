import { Administrator } from '../../entities/functionary/administrator.entity';

export interface IAdministratorService {
  getAdministrators(): Administrator[];
}
