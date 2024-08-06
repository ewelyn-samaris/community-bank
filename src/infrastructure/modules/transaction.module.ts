import { Module } from '@nestjs/common';
import { BankAccountModule } from './bank-account.module';
import { CreateTransactionValidationPipe } from '../../application/validators/create-transaction-validation.pipe';
import { CreateTransactionValidationService } from '../../domain/validators/create-transaction-validation.service';
import { TransactionService } from '../../domain/services/transaction.service';
import { CustomerModule } from './customer.module';
import { AppErrorModule } from './app-error.module';
import { TransactionController } from '../../application/controllers/transaction.controller';

@Module({
  imports: [BankAccountModule, CustomerModule, AppErrorModule],
  exports: [TransactionService, CreateTransactionValidationService, CreateTransactionValidationPipe],
  providers: [TransactionService, CreateTransactionValidationService, CreateTransactionValidationPipe],
  controllers: [TransactionController],
})
export class TransactionModule {}
