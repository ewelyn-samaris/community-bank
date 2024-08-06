import { Module } from '@nestjs/common';
import { AppErrorService } from '../../domain/services/app-error.service';
import { AppErrorController } from '../../application/controllers/app-error.controller';

@Module({
  exports: [AppErrorService],
  providers: [AppErrorService],
  controllers: [AppErrorController],
})
export class AppErrorModule {}
