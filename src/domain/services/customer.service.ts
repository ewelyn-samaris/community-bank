import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IAccountManagerService } from '../interfaces/functionary/account-manager-service.interface';
import { ICustomerCreationRequestService } from '../interfaces/customer-creation-request-service.interface';
import { Customer } from '../entities/customer/customer.entity';
import { PersonalCustomer } from '../entities/customer/personal-customer.entity';
import { BusinessCustomer } from '../entities/customer/business-customer.entity';
import { CustomerFactory } from '../factories/customer/customer.factory';
import { IEventManager } from '../interfaces/event-manager.interface';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject('ICustomerCreationRequestService')
    private readonly iCustomerCreationRequestService: ICustomerCreationRequestService,
    @Inject('IAccountManagerService') private readonly iAccountManagerService: IAccountManagerService,
    @Inject('IEventManager') private readonly iEventManager: IEventManager,
  ) {}

  private createCustomerCreationRequest(createCustomerDTO: CreateCustomerDTO): void {
    this.iCustomerCreationRequestService.createCustomerCreationRequest(createCustomerDTO);
  }

  getCustomers(): Customer[] {
    const customers = [...PersonalCustomer.personalCustomers, ...BusinessCustomer.businessCustomers];
    return customers;
  }

  getCustomerById(id: string): Customer {
    const customer = this.getCustomers().find((customer) => customer.id === id);
    return customer;
  }

  getCustomerByNationalIdentifier(nationalIdentifier: string): Customer {
    const customer = this.getCustomers().find((customer) => customer.nationalIdentifier === nationalIdentifier);
    return customer;
  }

  getCustomersByManagerId(managerId: string): Customer[] {
    const customers = this.getCustomers()?.filter((customer) => customer.accountManagerId === managerId);
    return customers;
  }

  softDeleteCustomer(id: string): void {
    const customer = this.getCustomerById(id);
    try {
      customer.updateStatusBeforeSoftDelete();
      customer.deletedAt = new Date();
    } catch (error) {
      throw new InternalServerErrorException(`Can't soft deleting customer. Internal server error: ${error}`);
    }
  }

  createCustomer(createCustomerDTO: CreateCustomerDTO): Customer {
    this.createCustomerCreationRequest(createCustomerDTO);
    const manager = this.iAccountManagerService.getManagerByRegion(createCustomerDTO.region);
    if (!manager) {
      throw new InternalServerErrorException(
        `Can't create customer, no manager found for region. Internal server error`,
      );
    }

    try {
      const customer: Customer = CustomerFactory.create(createCustomerDTO, manager.id);
      manager.customersIds.push(customer.id);
      this.iEventManager.notify(customer);
      return customer;
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer. Internal server error: ${error}`);
    }
  }
}
