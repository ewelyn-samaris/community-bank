import { Module } from '@nestjs/common';
import { AppErrorController } from './controllers/app-error.controller';
import { BankAccountController } from './controllers/bank-account.controller';
import { CustomerCreationRequestController } from './controllers/customer-creation-request.controller';
import { CustomerController } from './controllers/customer.controller';
import { TransactionController } from './controllers/transaction.controller';
import { DomainModule } from '../domain/domain.module';
import { CreateBankAccountValidationPipe } from './validators/create-bank-account-validation.pipe';
import { CreateFunctionaryValidationPipe } from './validators/create-functionary-validation.pipe';
import { NationalIdentifierValidationPipe } from './validators/national-identifier-validation.pipe';
import { CreateCustomerValidationPipe } from './validators/create-customer-validation.pipe';
import { CreateTransactionValidationPipe } from './validators/create-transaction-validation.pipe';
import { PaymentController } from './controllers/payment.controller';
import { FunctionaryController } from './controllers/functionary.controller';

@Module({
  imports: [DomainModule],
  exports: [
    CreateBankAccountValidationPipe,
    CreateFunctionaryValidationPipe,
    NationalIdentifierValidationPipe,
    CreateCustomerValidationPipe,
    CreateTransactionValidationPipe,
  ],
  providers: [
    CreateBankAccountValidationPipe,
    CreateFunctionaryValidationPipe,
    NationalIdentifierValidationPipe,
    CreateCustomerValidationPipe,
    CreateTransactionValidationPipe,
  ],
  controllers: [
    BankAccountController,
    CustomerController,
    TransactionController,
    AppErrorController,
    CustomerCreationRequestController,
    FunctionaryController,
    PaymentController,
  ],
})
export class ApplicationModule {}
