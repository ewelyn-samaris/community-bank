import { Module } from '@nestjs/common';
import { AdministratorModule } from './administrator.module';
import { AccountManagerModule } from './account-manager.module';
import { CreateFunctionaryValidationPipe } from '../../application/validators/create-functionary-validation.pipe';
import { CreateFunctionaryValidationService } from '../../domain/validators/create-functionary-validation.service';
import { FunctionaryService } from '../../domain/services/functionary.service';
import { FunctionaryController } from '../../application/controllers/functionary.controller';
import { AppErrorModule } from './app-error.module';
import { CommonModule } from './common.module';

@Module({
  imports: [AccountManagerModule, AdministratorModule, AppErrorModule, CommonModule],
  exports: [FunctionaryService],
  providers: [CreateFunctionaryValidationService, CreateFunctionaryValidationPipe, FunctionaryService],
  controllers: [FunctionaryController],
})
export class FunctionaryModule {}
