import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDTO } from '../../application/dtos/create-bank-account.dto';
import { AccountType } from '../enums/account-type.enum';
import { ErrorContext } from '../enums/error-context.enum';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { ErrorMessage } from '../enums/error-message.enum';
import { Customer } from '../entities/customer/customer.entity';
import 'dotenv/config';

@Injectable()
export class CreateBankAccountValidationService {
  private errorContext = ErrorContext.CREATE_ACCOUNT;

  constructor(@Inject('ICustomerService') private readonly iCustomerService: ICustomerService) {}

  private doesCustomerExists(customerId: string): Customer {
    const customer = this.iCustomerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.CUSTOMER_NOT_FOUND}`);
    }
    return customer;
  }

  doesCustomerHasMinAverageIncome(averageCapital: number): void {
    if (averageCapital < parseInt(process.env.MIN_TO_CHECK_ACCOUNT)) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.INSUFFICIENT_FUNDS}`);
    }
  }

  validate(createBankAccountDTO: CreateBankAccountDTO): void {
    const customer = this.doesCustomerExists(createBankAccountDTO.customerId);
    if (createBankAccountDTO.accountType === AccountType.CHECKING_ACCOUNT) {
      this.doesCustomerHasMinAverageIncome(customer.averageCapital);
    }
  }
}
