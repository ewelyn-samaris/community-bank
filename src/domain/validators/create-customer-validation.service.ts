import { Inject, Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IAppErrorService } from '../interfaces/apperror-service.interface';
import { Customer } from '../entities/customer/customer.entity';

@Injectable()
export class CreateCustomerValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_CUSTOMER;

  constructor(
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
    @Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService,
  ) {}

  private doesCustomerAlreadyExist(nationalIdentifier: string): void {
    const existingCustomer: Customer = this.iCustomerService.getCustomerByNationalIdentifier(nationalIdentifier);
    if (existingCustomer)
      throw this.iAppErrorService.createError(ErrorMessage.CUSTOMER_ALREADY_EXISTS, this.errorContext);
  }

  validate(nationalIdentifier: string): void {
    this.doesCustomerAlreadyExist(nationalIdentifier);
  }
}
