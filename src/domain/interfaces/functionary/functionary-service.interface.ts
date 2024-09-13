import { Functionary } from '../../entities/functionary/functionary.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';

export interface IFunctionaryService {
  getFunctionaries(): Promise<Functionary[]>;
  getFunctionaryByCpf(cpf: string): Promise<Functionary>;
  createFunctionary(createFunctionaryDTO: CreateFunctionaryDTO): Promise<Functionary>;
}
