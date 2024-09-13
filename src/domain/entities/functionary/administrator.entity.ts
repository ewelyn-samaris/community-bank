import { Entity } from 'typeorm';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { Functionary } from './functionary.entity';

@Entity('administrators')
export class Administrator extends Functionary {
  constructor(createAdministratorDto?: CreateFunctionaryDTO) {
    super(createAdministratorDto);
  }
}
