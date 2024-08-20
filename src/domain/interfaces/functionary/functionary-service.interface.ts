import { Functionary } from '../../entities/functionary/functionary.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';

export interface IFunctionaryService {
  getFunctionaries(): Functionary[];
  getFunctionaryByCpf(cpf: string): Functionary;
  createFunctionary(createFunctionaryDTO: CreateFunctionaryDTO): Functionary;
}
