import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../application/dtos/create-payment.dto';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IAppErrorService } from '../interfaces/apperror-service.interface';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';

@Injectable()
export class CreatePaymentValidationService {
  constructor(
    @Inject('ICustomerService') private readonly icustomerService: ICustomerService,
    @Inject('IBankAccountService') private readonly ibankAccountService: IBankAccountService,
    @Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService,
  ) {}

  private doesCustomerExistsAndOwnsAccount(customerId: string, accountId: string): void {
    const customer = this.icustomerService.getCustomerById(customerId);
    if (!customer) {
      throw this.iAppErrorService.createError(ErrorMessage.CUSTOMER_NOT_FOUND, ErrorContext.CREATE_PAYMENT);
    }

    if (customer.id !== accountId) {
      throw this.iAppErrorService.createError(
        ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER,
        ErrorContext.CREATE_PAYMENT,
      );
    }
  }

  private doesBeneficiaryAccountExists(beneficiaryAccountId: string): void {
    const beneficiaryAccount = this.ibankAccountService.getAccountById(beneficiaryAccountId);
    if (!beneficiaryAccount) {
      throw this.iAppErrorService.createError(ErrorMessage.BANK_ACCOUNT_NOT_FOUND, ErrorContext.CREATE_PAYMENT);
    }
  }

  validate(createPaymentDto: CreatePaymentDto): void {
    this.doesCustomerExistsAndOwnsAccount(createPaymentDto.customerId, createPaymentDto.accountId);
    this.doesBeneficiaryAccountExists(createPaymentDto.beneficiaryAccountId);
  }
}
