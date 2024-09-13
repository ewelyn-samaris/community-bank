import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerCreationRequest } from '../../domain/entities/customer-creation-request.entity';
import { ICustomerCreationRequestRepository } from '../interfaces/customer-creation-request-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerCreationRequestRepository implements ICustomerCreationRequestRepository {
  constructor(
    @InjectRepository(CustomerCreationRequest)
    private readonly customerCreationRequestRepository: Repository<CustomerCreationRequest>,
  ) {}

  async save(customerCreationRequest: CustomerCreationRequest): Promise<CustomerCreationRequest> {
    return await this.customerCreationRequestRepository.save(customerCreationRequest);
  }

  async findAll(): Promise<CustomerCreationRequest[]> {
    return await this.customerCreationRequestRepository.find();
  }

  async findByNationalIdentifier(nationalIdentifier: string): Promise<CustomerCreationRequest[]> {
    return await this.customerCreationRequestRepository.find({ where: { nationalIdentifier } });
  }
}
