import { CreateCustomerDTO } from 'src/application/dtos/create-customer.dto';
import { StatusType } from '../enums/status-type.enum';
import { v4 as uuidv4 } from 'uuid';

export class Customer {
  static customers: Customer[] = [];
  public id: string;
  public cpf: string;
  public name: string;
  public cellphone: string;
  public address: string;
  public averageIncome: number;
  public status: StatusType;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date;
  public accountsIds: string[];
  public accountManagerId: string;

  constructor(createCustomerDto: CreateCustomerDTO, managerId: string) {
    this.id = uuidv4();
    this.cpf = createCustomerDto.cpf;
    this.name = createCustomerDto.name.toUpperCase();
    this.cellphone = createCustomerDto.cellphone;
    this.address = createCustomerDto.address.toUpperCase();
    this.averageIncome = createCustomerDto.averageIncome;
    this.accountManagerId = managerId;
    this.status = StatusType.ACTIVE;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.accountsIds = [];

    Customer.customers.push(this);
  }

  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
