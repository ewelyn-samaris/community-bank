import { RequestStatus } from '../enums/request-status.enum';
import { ManagedRegion } from '../enums/managed-regions.enum';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { v4 as uuidv4 } from 'uuid';

export class CustomerCreationRequest {
  static requests: CustomerCreationRequest[] = [];
  id: string;
  nationalIdentifier: string;
  name: string;
  telephone: string;
  address: string;
  averageCapital: number;
  region: ManagedRegion;
  status: RequestStatus;
  createdAt: Date;
  responseDate?: Date;

  constructor(customerCreationRequestDTO: CreateCustomerDTO) {
    this.id = uuidv4();
    this.nationalIdentifier = customerCreationRequestDTO.nationalIdentifier;
    this.name = customerCreationRequestDTO.name.toUpperCase();
    this.telephone = customerCreationRequestDTO.telephone;
    this.averageCapital = customerCreationRequestDTO.averageCapital;
    this.address = customerCreationRequestDTO.address.toUpperCase();
    this.region = customerCreationRequestDTO.region;
    this.status = RequestStatus.PENDING;
    this.createdAt = new Date();

    CustomerCreationRequest.requests.push(this);
  }
}
