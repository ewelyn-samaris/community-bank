import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

export interface ICustomerCreationRequestService {
  save(customerCreationRequest: CustomerCreationRequest): Promise<CustomerCreationRequest>;
  getAllRequests(): Promise<CustomerCreationRequest[]>;
  getLastRequestByNationalIdentifier(nationalIdentifier: string): Promise<CustomerCreationRequest>;
  createCustomerCreationRequest(customerCreationRequestDTO: CreateCustomerDTO): Promise<CustomerCreationRequest>;
  closeRequest(customerCreationRequest: CustomerCreationRequest): Promise<void>;
}
