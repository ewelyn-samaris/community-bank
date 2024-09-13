import { Module } from '@nestjs/common';
import { CreateBankAccountValidationService } from './validators/create-bank-account-validation.service';
import { BankAccountService } from './services/bank-account.service';
import { UpdateBankAccountTypeValidationService } from '../domain/validators/update-bank-account-type-validation.service';
import { WithdrawService } from './services/transactions/withdraw.service';
import { DepositService } from './services/transactions/deposit.service';
import { TransferService } from './services/transactions/transfer.service';
import { AccountManagerService } from './services/functionaries/account-manager.service';
import { CustomerCreationRequestService } from './services/customer-creation-request.service';
import { CustomerService } from './services/customer.service';
import { CpfValidationService } from './validators/cpf-validation.service';
import { FunctionaryService } from './services/functionaries/functionary.service';
import { CreateFunctionaryValidationService } from './validators/create-functionary-validation.service';
import { AdministratorService } from './services/functionaries/administrator.service';
import { CreateCustomerValidationService } from './validators/create-customer-validation.service';
import { CreateTransactionValidationService } from './validators/create-transaction-validation.service';
import { TransactionService } from './services/transactions/transaction.service';
import { PaymentService } from './services/payments/payment.service';
import { PixPaymentService } from './services/payments/pix-payment.service';
import { BillPaymentService } from './services/payments/bill-payment.service';
import { CnpjValidationService } from './validators/cnpj-validation.service';
import { EventManagerService } from './interfaces/event-manager.service';
import { CreatePaymentValidationService } from './validators/create-payment-validation.service';
import { SavingAccountObserverService } from './services/saving-account-observer.service';
import { InfraStructureModule } from '../infrastructure/infrastruct.module';

@Module({
  imports: [InfraStructureModule],
  exports: [
    CreateBankAccountValidationService,
    CreateFunctionaryValidationService,
    CreateTransactionValidationService,
    CreatePaymentValidationService,
    CreateCustomerValidationService,
    CpfValidationService,
    CnpjValidationService,
    UpdateBankAccountTypeValidationService,
    'IBankAccountService',
    'IWithdrawService',
    'IDepositService',
    'ITransferService',
    'IAccountManagerService',
    'IAdministratorService',
    'ICustomerCreationRequestService',
    'ICustomerService',
    'IFunctionaryService',
    'ITransactionService',
    'IPaymentService',
    'PixPaymentService',
    'BillPaymentService',
    'IEventManager',
    'IObserver',
  ],
  providers: [
    CreateBankAccountValidationService,
    CreateFunctionaryValidationService,
    CreateTransactionValidationService,
    CreatePaymentValidationService,
    CreateCustomerValidationService,
    CpfValidationService,
    CnpjValidationService,
    UpdateBankAccountTypeValidationService,
    {
      provide: 'IObserver',
      useClass: SavingAccountObserverService,
    },
    {
      provide: 'IEventManager',
      useClass: EventManagerService,
    },
    {
      provide: 'ICustomerCreationRequestService',
      useClass: CustomerCreationRequestService,
    },
    {
      provide: 'ICustomerService',
      useClass: CustomerService,
    },
    {
      provide: 'IBankAccountService',
      useClass: BankAccountService,
    },
    {
      provide: 'IWithdrawService',
      useClass: WithdrawService,
    },
    {
      provide: 'IDepositService',
      useClass: DepositService,
    },
    {
      provide: 'ITransferService',
      useClass: TransferService,
    },
    {
      provide: 'ITransactionService',
      useClass: TransactionService,
    },
    {
      provide: 'BillPaymentService',
      useClass: BillPaymentService,
    },
    {
      provide: 'PixPaymentService',
      useClass: PixPaymentService,
    },
    {
      provide: 'IPaymentService',
      useClass: PaymentService,
    },
    {
      provide: 'IAccountManagerService',
      useClass: AccountManagerService,
    },
    {
      provide: 'IAdministratorService',
      useClass: AdministratorService,
    },
    {
      provide: 'IFunctionaryService',
      useClass: FunctionaryService,
    },
  ],
})
export class DomainModule {}
