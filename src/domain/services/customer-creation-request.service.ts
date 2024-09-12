import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { RequestStatus } from '../enums/request-status.enum';
import { CustomerCreationRequestFactory } from '../factories/customer-creation-request.factory';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';
import { ICustomerCreationRequestService } from '../interfaces/customer-creation-request-service.interface';

@Injectable()
export class CustomerCreationRequestService implements ICustomerCreationRequestService {
  private closeRequest(customerCreationRequest: CustomerCreationRequest): void {
    customerCreationRequest.status = RequestStatus.PROCESSED;
  }

  getAllRequests(): CustomerCreationRequest[] {
    const requests = CustomerCreationRequest.requests;
    if (!requests.length) {
      throw new NotFoundException(`No customer-creation-requests found`);
    }
    return requests;
  }

  getLastRequestByNationalIdentifier(nationalIdentifier: string): CustomerCreationRequest {
    const requests = this.getAllRequests().filter((request) => request.nationalIdentifier === nationalIdentifier);
    if (!requests.length) {
      throw new NotFoundException(`No customer-creation-request found for identifier: ${nationalIdentifier}`);
    }
    const latestRequest = requests.reduce((latest, request) => {
      return latest.createdAt > request.createdAt ? latest : request;
    });
    return latestRequest;
  }

  createCustomerCreationRequest(customerCreationRequestDTO: CreateCustomerDTO): CustomerCreationRequest {
    try {
      const request: CustomerCreationRequest = CustomerCreationRequestFactory.create(customerCreationRequestDTO);
      this.closeRequest(request);
      return request;
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer-creation-request. Internal server error: ${error}`);
    }
  }
}
