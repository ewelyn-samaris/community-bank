import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IAccountManagerService } from '../interfaces/functionary/account-manager-service.interface';
import { ICustomerCreationRequestService } from '../interfaces/customer-creation-request-service.interface';
import { Customer } from '../entities/customer/customer.entity';
import { PersonalCustomer } from '../entities/customer/personal-customer.entity';
import { BusinessCustomer } from '../entities/customer/business-customer.entity';
import { CustomerFactory } from '../factories/customer/customer.factory';
import { IEventManager } from '../interfaces/event-manager.interface';
import { ICustomerRepository } from '../../infrastructure/interfaces/customer-repository.interface';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject('IBusinessCustomerRepository')
    private readonly iBusinessCustomerRepository: ICustomerRepository<BusinessCustomer>,
    @Inject('IPersonalCustomerRepository')
    private readonly iPersonalCustomerRepository: ICustomerRepository<PersonalCustomer>,
    @Inject('ICustomerCreationRequestService')
    private readonly iCustomerCreationRequestService: ICustomerCreationRequestService,
    @Inject('IAccountManagerService') private readonly iAccountManagerService: IAccountManagerService,
    @Inject('IEventManager') private readonly iEventManager: IEventManager,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    if (customer instanceof BusinessCustomer) {
      return await this.iBusinessCustomerRepository.save(customer as BusinessCustomer);
    }
    return await this.iPersonalCustomerRepository.save(customer as PersonalCustomer);
  }

  async getCustomers(): Promise<Customer[]> {
    const personals = await this.iPersonalCustomerRepository.findAll();
    const businesses = await this.iBusinessCustomerRepository.findAll();
    const customers = [...personals, ...businesses];

    if (!customers.length) {
      throw new NotFoundException(`No customers found in the database`);
    }
    return customers;
  }

  async getCustomerById(id: string): Promise<Customer> {
    let customer = await this.iBusinessCustomerRepository.findOneById(id);
    if (customer) {
      return customer;
    }
    customer = await this.iPersonalCustomerRepository.findOneById(id);
    if (!customer) {
      throw new NotFoundException(`No customer found with the given id #${id}`);
    }
    return customer;
  }

  async getCustomerByNationalIdentifier(nationalIdentifier: string): Promise<Customer> {
    let customer = await this.iBusinessCustomerRepository.findOneByNationalIdentifier(nationalIdentifier);
    if (customer) {
      return customer;
    }

    customer = await this.iPersonalCustomerRepository.findOneByNationalIdentifier(nationalIdentifier);
    if (!customer) {
      throw new NotFoundException(`No customer found for the given identifier #${nationalIdentifier}`);
    }
    return customer;
  }

  async softRemoveCustomer(id: string): Promise<void> {
    const customer = await this.getCustomerById(id);
    try {
      customer instanceof BusinessCustomer
        ? await this.iBusinessCustomerRepository.softRemove(customer as BusinessCustomer)
        : await this.iPersonalCustomerRepository.softRemove(customer as PersonalCustomer);
      await this.save(customer);
    } catch (error) {
      throw new InternalServerErrorException(`Can't delete customer. Internal server error: ${error}`);
    }
  }

  async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const customerCreationRequest = await this.iCustomerCreationRequestService.createCustomerCreationRequest(
      createCustomerDTO,
    );
    const manager = await this.iAccountManagerService.getManagerByRegion(createCustomerDTO.region);
    if (!manager) {
      throw new InternalServerErrorException(
        `Can't create customer, no manager found for region. Internal server error`,
      );
    }

    const customer: Customer = CustomerFactory.create(createCustomerDTO, manager);
    await this.iCustomerCreationRequestService.closeRequest(customerCreationRequest);

    try {
      await this.save(customer);
      this.iEventManager.notify(customer);
      return customer;
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer. Internal server error: ${error}`);
    }
  }
}
