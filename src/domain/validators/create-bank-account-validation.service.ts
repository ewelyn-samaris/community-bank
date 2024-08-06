import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { AccountType } from '../enums/account-type.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';
import { AppErrorService } from '../services/app-error.service';
import { Customer } from '../entities/customer.entity';
import { CustomerService } from '../services/customer.service';
import 'dotenv/config';

@Injectable()
export class CreateBankAccountValidationService {
  private errorContext = ErrorContext.CREATE_ACCOUNT;

  constructor(
    private readonly appErrorService: AppErrorService,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
  ) {}

  private doesCustomerExists(customerId: string): Customer {
    const customer = this.customerService.getCustomerById(customerId);
    if (customer.id !== customerId) {
      throw this.appErrorService.createError(ErrorMessage.CUSTOMER_DOES_NOT_EXIST, this.errorContext);
    }
    return customer;
  }

  private doesCustomerHasMinAverageIncome(customer: Customer): void {
    if (customer.averageIncome < parseInt(process.env.MIN_TO_CHECK_ACCOUNT)) {
      throw this.appErrorService.createError(ErrorMessage.INSUFFICIENT_FUNDS, this.errorContext);
    }
  }

  validate(createBankAccountDTO: CreateBankAccountDTO): void {
    const customer = this.doesCustomerExists(createBankAccountDTO.customerId);
    if (createBankAccountDTO.accountType === AccountType.CHECKING_ACCOUNT) {
      this.doesCustomerHasMinAverageIncome(customer);
    }
  }
}
