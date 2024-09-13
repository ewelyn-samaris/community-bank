import { Administrator } from '../../domain/entities/functionary/administrator.entity';
import { IRepository } from './repository.interface';

export interface IAdministratorRepository extends IRepository<Administrator> {
  findOneByCpf(cpf: string): Promise<Administrator>;
}
