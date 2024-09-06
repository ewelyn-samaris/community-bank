import { Module } from '@nestjs/common';
import { CustomerCreationRequestService } from '../../domain/services/customer-creation-request.service';
import { CustomerCreationRequestController } from '../../application/controllers/customer-creation-request.controller';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule],
  exports: [CustomerCreationRequestService],
  providers: [CustomerCreationRequestService],
  controllers: [CustomerCreationRequestController],
})
export class CustomerCreationRequestModule {}
