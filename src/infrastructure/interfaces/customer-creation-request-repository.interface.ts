import { CustomerCreationRequest } from '../../domain/entities/customer-creation-request.entity';
import { IRepository } from './repository.interface';

export interface ICustomerCreationRequestRepository extends IRepository<CustomerCreationRequest> {
  findByNationalIdentifier(nationalIdentifier: string): Promise<CustomerCreationRequest[]>;
}
