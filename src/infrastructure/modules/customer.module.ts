import { forwardRef, Module } from '@nestjs/common';
import { CreateCustomerValidationPipe } from '../../application/validators/create-customer-validation.pipe';
import { CreateCustomerValidationService } from '../../domain/validators/create-customer-validation.service';
import { CustomerService } from '../../domain/services/customer.service';
import { CustomerController } from '../../application/controllers/customer.controller';
import { CustomerCreationRequestModule } from './customer-creation-request.module';
import { AccountManagerModule } from './account-manager.module';
import { BankAccountModule } from './bank-account.module';
import { CommonModule } from './common.module';
import { AppErrorModule } from './app-error.module';

@Module({
  imports: [
    forwardRef(() => BankAccountModule),
    CustomerCreationRequestModule,
    AccountManagerModule,
    CommonModule,
    AppErrorModule,
  ],
  exports: [CustomerService],
  providers: [CustomerService, CreateCustomerValidationService, CreateCustomerValidationPipe],
  controllers: [CustomerController],
})
export class CustomerModule {}
