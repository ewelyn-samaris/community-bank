import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { Customer } from '../entities/customer/customer.entity';

export interface ICustomerService {
  save(customer: Customer): Promise<Customer>;
  getCustomers(): Promise<Customer[]>;
  getCustomerById(id: string): Promise<Customer>;
  getCustomerByNationalIdentifier(nationalIdentifier: string): Promise<Customer>;
  softRemoveCustomer(id: string): Promise<void>;
  createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
}
