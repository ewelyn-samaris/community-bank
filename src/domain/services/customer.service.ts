import { Injectable } from '@nestjs/common';
import { CustomerFactory } from '../factories/customer.factory';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { CustomerCreationRequestService } from './customer-creation-request.service';
import { AccountManagerService } from './account-manager.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerCreationRequestService: CustomerCreationRequestService,
    private readonly accountManagerService: AccountManagerService,
  ) {}

  getCustomers(): Customer[] {
    return Customer.customers;
  }

  getCustomerById(id: string): Customer {
    return this.getCustomers().find((customer) => customer.id === id);
  }

  getCustomerByCpf(cpf: string): Customer {
    return this.getCustomers().find((customer) => customer.cpf === cpf);
  }

  getCustomersByManagerID(managerID: string): Customer[] {
    return this.getCustomers().filter((customer) => customer.accountManagerId === managerID);
  }

  softDeleteCustomer(id: string): void {
    this.getCustomerById(id).updateStatusBeforeSoftDelete();
  }

  private createCustomerCreationRequest(createCustomerDTO: CreateCustomerDTO): void {
    this.customerCreationRequestService.createCustomerCreationRequest(createCustomerDTO);
  }

  createCustomer(createCustomerDTO: CreateCustomerDTO): Customer {
    this.createCustomerCreationRequest(createCustomerDTO);
    const managerId = this.accountManagerService.getManagerByRegion(createCustomerDTO.region).id;
    const customer: Customer = CustomerFactory.create(createCustomerDTO, managerId);
    return customer;
  }
}
