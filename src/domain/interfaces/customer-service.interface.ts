import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { Customer } from '../entities/customer/customer.entity';

export interface ICustomerService {
  getCustomers(): Customer[];
  getCustomerById(id: string): Customer;
  getCustomerByNationalIdentifier(nationalIdentifier: string): Customer;
  getCustomersByManagerId(managerID: string): Customer[];
  softDeleteCustomer(id: string): void;
  createCustomer(createCustomerDTO: CreateCustomerDTO): Customer;
}
