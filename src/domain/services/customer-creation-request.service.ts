import { Injectable } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { RequestStatus } from '../enums/request-status.enum';
import { CustomerCreationRequestFactory } from '../factories/customer-creation-request.factory';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

@Injectable()
export class CustomerCreationRequestService {
  private closeRequest(customerCreationRequest: CustomerCreationRequest): void {
    customerCreationRequest.status = RequestStatus.PROCESSED;
  }

  getAllRequests(): CustomerCreationRequest[] {
    return CustomerCreationRequest.requests;
  }

  getRequestByCpf(cpf: string): CustomerCreationRequest {
    return this.getAllRequests().find((request) => request.cpf === cpf);
  }

  createCustomerCreationRequest(customerCreationRequestDTO: CreateCustomerDTO): CustomerCreationRequest {
    const request: CustomerCreationRequest = CustomerCreationRequestFactory.create(customerCreationRequestDTO);
    this.closeRequest(request);
    return request;
  }
}
