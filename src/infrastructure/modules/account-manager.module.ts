import { Module } from '@nestjs/common';
import { AccountManagerService } from '../../domain/services/account-manager.service';

@Module({
  exports: [AccountManagerService],
  providers: [AccountManagerService],
})
export class AccountManagerModule {}
