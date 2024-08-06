import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

export abstract class CustomerCreationRequestFactory {
  static create(customerCreationRequestDTO: CreateCustomerDTO): CustomerCreationRequest {
    return new CustomerCreationRequest(customerCreationRequestDTO);
  }
}
