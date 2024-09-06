import { InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

export abstract class CustomerCreationRequestFactory {
  static create(customerCreationRequestDTO: CreateCustomerDTO): CustomerCreationRequest {
    try {
      return new CustomerCreationRequest(customerCreationRequestDTO);
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer-creation-request. Internal server error: ${error}`);
    }
  }
}
