import { Injectable } from '@nestjs/common';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { CustomerService } from '../services/customer.service';
import { AppErrorService } from '../services/app-error.service';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CreateCustomerValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_CUSTOMER;

  constructor(
    private readonly customerService: CustomerService,
    private readonly appErrorService: AppErrorService,
  ) {}

  private doesCustomerAlreadyExist(cpf: string): void {
    const existingCustomer: Customer = this.customerService.getCustomerByCpf(cpf);
    if (existingCustomer)
      throw this.appErrorService.createError(ErrorMessage.CUSTOMER_ALREADY_EXISTS, this.errorContext);
  }

  validate(customerCreationRequestDTO: CreateCustomerDTO): void {
    this.doesCustomerAlreadyExist(customerCreationRequestDTO.cpf);
  }
}
