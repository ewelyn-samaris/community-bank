import { v4 as uuidv4 } from 'uuid';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { OfficeTypes } from '../enums/office-types.enum';
import { StatusType } from '../enums/status-type.enum';

export abstract class Functionary {
  id: string;
  cpf: string;
  name: string;
  admittedOn: Date;
  salary: number;
  office: OfficeTypes;
  status: StatusType;
  dismissedOn?: Date;

  constructor(createFunctionaryDTO: CreateFunctionaryDTO) {
    this.id = uuidv4();
    this.cpf = createFunctionaryDTO.cpf;
    this.name = createFunctionaryDTO.name.toUpperCase();
    this.office = createFunctionaryDTO.office;
    this.salary = createFunctionaryDTO.salary;
    this.admittedOn = new Date(createFunctionaryDTO.admittedOn);
    this.status = StatusType.ACTIVE;
  }
}
