import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { Functionary } from './functionary.entity';

export class Administrator extends Functionary {
  static administrators: Administrator[] = [];

  constructor(functionaryDTO: CreateFunctionaryDTO) {
    super(functionaryDTO);

    Administrator.administrators.push(this);
  }
}
