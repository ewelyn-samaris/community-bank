import { Inject, Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { Customer } from '../entities/customer/customer.entity';

@Injectable()
export class CreateCustomerValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_CUSTOMER;

  constructor(@Inject('ICustomerService') private readonly iCustomerService: ICustomerService) {}

  private async doesCustomerAlreadyExist(nationalIdentifier: string): Promise<void> {
    const existingCustomer: Customer = await this.iCustomerService.getCustomerByNationalIdentifier(nationalIdentifier);
    if (existingCustomer) throw new Error(`${this.errorContext} - ${ErrorMessage.CUSTOMER_ALREADY_EXISTS}`);
  }

  async validate(nationalIdentifier: string): Promise<void> {
    await this.doesCustomerAlreadyExist(nationalIdentifier);
  }
}
