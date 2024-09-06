import { Module } from '@nestjs/common';
import { CpfValidationPipe } from '../../application/validators/cpf-validation.pipe';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { AppErrorModule } from './app-error.module';

@Module({
  imports: [AppErrorModule],
  exports: [CpfValidationPipe, CpfValidationService],
  providers: [CpfValidationPipe, CpfValidationService],
})
export class CommonModule {}
