import { RequestStatus } from '../enums/request-status.enum';
import { ManagedRegion } from '../enums/managed-regions.enum';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { v4 as uuidv4 } from 'uuid';

export class CustomerCreationRequest {
  static requests: CustomerCreationRequest[] = [];
  id: string;
  cpf: string;
  name: string;
  cellphone: string;
  address: string;
  averageIncome: number;
  region: ManagedRegion;
  status: RequestStatus;
  createdAt: Date;
  responseDate?: Date;

  constructor(customerCreationRequestDTO: CreateCustomerDTO) {
    this.id = uuidv4();
    this.cpf = customerCreationRequestDTO.cpf;
    this.name = customerCreationRequestDTO.name.toUpperCase();
    this.cellphone = customerCreationRequestDTO.cellphone;
    this.averageIncome = customerCreationRequestDTO.averageIncome;
    this.address = customerCreationRequestDTO.address;
    this.region = customerCreationRequestDTO.region;
    this.status = RequestStatus.PENDING;
    this.createdAt = new Date();

    CustomerCreationRequest.requests.push(this);
  }
}
