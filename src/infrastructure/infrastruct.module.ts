import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountManagerRepository } from './repositories/account-manager.repository';
import { AdminitratorRepository } from './repositories/administrator.repository';
import { BusinessCustomerRepository } from './repositories/business-customer.repository';
import { PersonalCustomerRepository } from './repositories/personal-customer.repository';
import { CheckingAccountRepository } from './repositories/checking-account.repository';
import { SavingAccountRepository } from './repositories/saving-account.repository';
import { CustomerCreationRequestRepository } from './repositories/customer-creation-request.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { SavingAccount } from '../domain/entities/bank-account/saving-account.entity';
import { CheckingAccount } from '../domain/entities/bank-account/checking-account.entity';
import { BusinessCustomer } from '../domain/entities/customer/business-customer.entity';
import { PersonalCustomer } from '../domain/entities/customer/personal-customer.entity';
import { Administrator } from '../domain/entities/functionary/administrator.entity';
import { AccountManager } from '../domain/entities/functionary/account-manager.entity';
import { CustomerCreationRequest } from '../domain/entities/customer-creation-request.entity';
import { Payment } from '../domain/entities/payment/payment.entity';
import { Transaction } from '../domain/entities/transaction/transaction.entity';
import { BankAccount } from '../domain/entities/bank-account/bank-account.entity';
import { Customer } from '../domain/entities/customer/customer.entity';
import { Functionary } from '../domain/entities/functionary/functionary.entity';
import { Bill } from '../domain/entities/payment/bill.entity';
import { Pix } from '../domain/entities/payment/pix.entity';
import { Deposit } from '../domain/entities/transaction/deposit.entity';
import { Transfer } from '../domain/entities/transaction/transfer.entity';
import { Withdraw } from '../domain/entities/transaction/withdraw.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankAccount,
      SavingAccount,
      CheckingAccount,
      Customer,
      BusinessCustomer,
      PersonalCustomer,
      CustomerCreationRequest,
      Functionary,
      Administrator,
      AccountManager,
      Payment,
      Bill,
      Pix,
      Transaction,
      Deposit,
      Transfer,
      Withdraw,
    ]),
  ],
  providers: [
    {
      provide: 'IAccountManagerRepository',
      useClass: AccountManagerRepository,
    },
    {
      provide: 'IAdministratorRepository',
      useClass: AdminitratorRepository,
    },
    {
      provide: 'IBusinessCustomerRepository',
      useClass: BusinessCustomerRepository,
    },
    {
      provide: 'IPersonalCustomerRepository',
      useClass: PersonalCustomerRepository,
    },
    {
      provide: 'ICustomerCreationRequestRepository',
      useClass: CustomerCreationRequestRepository,
    },
    {
      provide: 'ICheckingAccountRepository',
      useClass: CheckingAccountRepository,
    },
    {
      provide: 'ISavingAccountRepository',
      useClass: SavingAccountRepository,
    },
    {
      provide: 'IPaymentRepository',
      useClass: PaymentRepository,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
  ],
  exports: [
    'IAccountManagerRepository',
    'IAdministratorRepository',
    'IBusinessCustomerRepository',
    'IPersonalCustomerRepository',
    'ICustomerCreationRequestRepository',
    'ICheckingAccountRepository',
    'ISavingAccountRepository',
    'IPaymentRepository',
    'ITransactionRepository',
  ],
})
export class InfraStructureModule {}
