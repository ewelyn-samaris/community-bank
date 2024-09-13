import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { RequestStatus } from '../enums/request-status.enum';
import { CustomerCreationRequestFactory } from '../factories/customer-creation-request.factory';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';
import { ICustomerCreationRequestService } from '../interfaces/customer-creation-request-service.interface';
import { ICustomerCreationRequestRepository } from '../../infrastructure/interfaces/customer-creation-request-repository.interface';

@Injectable()
export class CustomerCreationRequestService implements ICustomerCreationRequestService {
  constructor(
    @Inject('ICustomerCreationRequestRepository')
    private readonly iCustomerCreationRequestRepository: ICustomerCreationRequestRepository,
  ) {}

  async save(customerCreationRequest: CustomerCreationRequest): Promise<CustomerCreationRequest> {
    return await this.iCustomerCreationRequestRepository.save(customerCreationRequest);
  }

  async getAllRequests(): Promise<CustomerCreationRequest[]> {
    const requests = await this.iCustomerCreationRequestRepository.findAll();
    if (!requests.length) {
      throw new NotFoundException(`No customer-creation-requests found`);
    }
    return requests;
  }

  async getLastRequestByNationalIdentifier(nationalIdentifier: string): Promise<CustomerCreationRequest> {
    const requests = await this.iCustomerCreationRequestRepository.findByNationalIdentifier(nationalIdentifier);
    if (!requests.length) {
      throw new NotFoundException(`No customer-creation-request found for identifier #${nationalIdentifier}`);
    }
    const latestRequest = requests.reduce((latest, request) => {
      return latest.createdAt > request.createdAt ? latest : request;
    });
    return latestRequest;
  }

  async createCustomerCreationRequest(customerCreationRequestDTO: CreateCustomerDTO): Promise<CustomerCreationRequest> {
    const request: CustomerCreationRequest = CustomerCreationRequestFactory.create(customerCreationRequestDTO);
    try {
      return await this.save(request);
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer-creation-request. Internal server error: ${error}`);
    }
  }

  async closeRequest(customerCreationRequest: CustomerCreationRequest): Promise<void> {
    try {
      customerCreationRequest.status = RequestStatus.PROCESSED;
      await this.iCustomerCreationRequestRepository.save(customerCreationRequest);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't close request #${customerCreationRequest.id}. Internal server error`,
      );
    }
  }
}
