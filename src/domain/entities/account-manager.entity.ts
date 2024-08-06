import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { Functionary } from './functionary.entity';
import { ManagedRegion } from '../enums/managed-regions.enum';
import { Customer } from './customer.entity';

export class AccountManager extends Functionary {
  static managers: AccountManager[] = [];
  managedRegion: ManagedRegion;
  customers?: Customer[];

  constructor(functionaryDTO: CreateFunctionaryDTO) {
    super(functionaryDTO);
    this.managedRegion = functionaryDTO.managedRegion;

    AccountManager.managers.push(this);
  }
}
