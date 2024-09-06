import { Get } from '@nestjs/common';
import { Controller, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { AppErrorService } from '../../domain/services/app-error.service';
import { AppError } from '../../domain/entities/app-error.entity';

@Controller('v1/app-errors')
export class AppErrorController {
  constructor(private readonly appErrorService: AppErrorService) {}

  @Get()
  getAppErrors(): AppResponse {
    try {
      const appErrors: AppError[] = this.appErrorService.getAppErrors();
      return {
        statusCode: HttpStatus.OK,
        message: 'All application errors retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: appErrors,
      };
    } catch (error) {
      throw new NotFoundException(`No errors found`);
    }
  }
}
