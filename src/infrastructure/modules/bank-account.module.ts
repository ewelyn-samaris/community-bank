import { forwardRef, Module } from '@nestjs/common';
import { CreateBankAccountValidationPipe } from '../../application/validators/create-bank-account-validation.pipe';
import { CreateBankAccountValidationService } from '../../domain/validators/create-bank-account-validation.service';
import { BankAccountService } from '../../domain/services/bank-account.service';
import { BankAccountController } from '../../application/controllers/bank-account.controller';
import { CustomerModule } from './customer.module';
import { AppErrorModule } from './app-error.module';
import { UpdateBankAccountTypeValidationService } from 'src/domain/validators/update-bank-account-type-validation.service';
import { SavingAccountService } from 'src/domain/services/saving-account.service';
import { CheckingAccountService } from 'src/domain/services/checking-account.service';
import { AccountManagerModule } from './account-manager.module';
import { CustomerCreationRequestModule } from './customer-creation-request.module';

@Module({
  imports: [forwardRef(() => CustomerModule), AppErrorModule, AccountManagerModule, CustomerCreationRequestModule],
  exports: [BankAccountService],
  providers: [
    CreateBankAccountValidationPipe,
    CreateBankAccountValidationService,
    BankAccountService,
    UpdateBankAccountTypeValidationService,
    SavingAccountService,
    CheckingAccountService,
  ],
  controllers: [BankAccountController],
})
export class BankAccountModule {}
