import { Module } from '@nestjs/common';
import { FunctionaryModule } from './functionary.module';
import { TransactionModule } from './transaction.module';
import { CommonModule } from './common.module';
import { AppErrorModule } from './app-error.module';
import { CustomerCreationRequestModule } from './customer-creation-request.module';
import { CustomerModule } from './customer.module';
import { AdministratorModule } from './administrator.module';
import { AccountManagerModule } from './account-manager.module';
import { BankAccountModule } from './bank-account.module';

@Module({
  imports: [
    AdministratorModule,
    AccountManagerModule,
    FunctionaryModule,
    AppErrorModule,
    CommonModule,
    TransactionModule,
    BankAccountModule,
    CustomerCreationRequestModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
  exports: [BankAccountModule, CustomerModule],
})
export class AppModule {}
