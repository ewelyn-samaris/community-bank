import { ManagedRegion } from '../../enums/managed-regions.enum';
import { Functionary } from './functionary.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';

export class AccountManager extends Functionary {
  static managers: AccountManager[] = [];
  managedRegion: ManagedRegion;
  customersIds?: string[] = [];

  constructor(functionaryDTO: CreateFunctionaryDTO) {
    super(functionaryDTO);
    this.managedRegion = functionaryDTO.managedRegion;

    AccountManager.managers.push(this);
  }
}
