import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { CustomerType } from '../../enums/customer-type.enum';
import { StatusType } from '../../enums/status-type.enum';

export abstract class Customer {
  public id: string;
  public nationalIdentifier: string;
  public name: string;
  public telephone: string;
  public address: string;
  public averageCapital: number;
  public abstract type: CustomerType;
  public status: StatusType;
  public createdAt: Date;
  public deletedAt?: Date;
  public accountsIds?: string[] = [];
  public accountManagerId: string;

  constructor(createCustomerDto: CreateCustomerDTO, managerId: string) {
    this.id = uuidv4();
    this.nationalIdentifier = createCustomerDto.nationalIdentifier;
    this.name = createCustomerDto.name.toUpperCase();
    this.telephone = createCustomerDto.telephone;
    this.address = createCustomerDto.address.toUpperCase();
    this.averageCapital = createCustomerDto.averageCapital;
    this.accountManagerId = managerId;
    this.status = StatusType.ACTIVE;
    this.createdAt = new Date();
  }

  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
