import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessCustomer } from '../../domain/entities/customer/business-customer.entity';
import { ICustomerRepository } from '../interfaces/customer-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessCustomerRepository implements ICustomerRepository<BusinessCustomer> {
  constructor(
    @InjectRepository(BusinessCustomer)
    private readonly iBusinessCutomerRepository: Repository<BusinessCustomer>,
  ) {}

  async save(businessCustomer: BusinessCustomer): Promise<BusinessCustomer> {
    return await this.iBusinessCutomerRepository.save(businessCustomer);
  }

  async findAll(): Promise<BusinessCustomer[]> {
    return await this.iBusinessCutomerRepository.find();
  }

  async findOneByNationalIdentifier(nationalIdentifier: string): Promise<BusinessCustomer> {
    return await this.iBusinessCutomerRepository.findOne({ where: { nationalIdentifier } });
  }

  async findOneById(id: string): Promise<BusinessCustomer> {
    return await this.iBusinessCutomerRepository.findOne({ where: { id } });
  }

  async softRemove(customer: BusinessCustomer): Promise<void> {
    await this.iBusinessCutomerRepository.softRemove(customer);
  }
}
