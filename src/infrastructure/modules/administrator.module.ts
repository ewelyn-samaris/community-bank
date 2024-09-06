import { Module } from '@nestjs/common';
import { AdministratorService } from '../../domain/services/administrator.service';

@Module({
  exports: [AdministratorService],
  providers: [AdministratorService],
})
export class AdministratorModule {}
