import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

export interface ICustomerCreationRequestService {
  getAllRequests(): CustomerCreationRequest[];
  getLastRequestByNationalIdentifier(nationalIdentifier: string): CustomerCreationRequest;
  createCustomerCreationRequest(customerCreationRequestDTO: CreateCustomerDTO): CustomerCreationRequest;
}
