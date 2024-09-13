import { Customer } from '../../domain/entities/customer/customer.entity';
import { IRepository } from './repository.interface';

export interface ICustomerRepository<T extends Customer> extends IRepository<T> {
  findOneByNationalIdentifier(nationalIdentifier: string): Promise<T>;
  findOneById(id: string): Promise<T>;
  softRemove(customer: T): Promise<void>;
}
