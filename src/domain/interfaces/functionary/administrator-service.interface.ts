import { Administrator } from '../../entities/functionary/administrator.entity';

export interface IAdministratorService {
  save(administrator: Administrator): Promise<Administrator>;
  getAdministrators(): Promise<Administrator[]>;
  getAdministratorByCpf(cpf: string): Promise<Administrator>;
}
