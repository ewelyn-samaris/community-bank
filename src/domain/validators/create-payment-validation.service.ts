import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../application/dtos/create-payment.dto';
import { ICustomerService } from '../interfaces/customer-service.interface';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';

@Injectable()
export class CreatePaymentValidationService {
  constructor(
    @Inject('ICustomerService') private readonly icustomerService: ICustomerService,
    @Inject('IBankAccountService') private readonly ibankAccountService: IBankAccountService,
  ) {}

  private async doesCustomerExistsAndOwnsAccount(customerId: string, accountId: string): Promise<void> {
    const customer = await this.icustomerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error(`${ErrorContext.CREATE_PAYMENT} - ${ErrorMessage.CUSTOMER_NOT_FOUND}`);
    }

    if (customer.id !== accountId) {
      throw new Error(`${ErrorContext.CREATE_PAYMENT} - ${ErrorMessage.ACCOUNT_DOES_NOT_BELONG_TO_CUSTOMER}`);
    }
  }

  private async doesBeneficiaryAccountExists(beneficiaryAccountId: string): Promise<void> {
    const beneficiaryAccount = await this.ibankAccountService.getAccountById(beneficiaryAccountId);
    if (!beneficiaryAccount) {
      throw new Error(`${ErrorContext.CREATE_PAYMENT} - ${ErrorMessage.BANK_ACCOUNT_NOT_FOUND}`);
    }
  }

  async validate(createPaymentDto: CreatePaymentDto): Promise<void> {
    await this.doesCustomerExistsAndOwnsAccount(createPaymentDto.customerId, createPaymentDto.accountId);
    await this.doesBeneficiaryAccountExists(createPaymentDto.beneficiaryAccountId);
  }
}
