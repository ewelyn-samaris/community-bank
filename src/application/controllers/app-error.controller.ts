import { Get, Inject } from '@nestjs/common';
import { Controller, HttpStatus } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { AppError } from '../../domain/entities/app-error.entity';
import { IAppErrorService } from '../../domain/interfaces/apperror-service.interface';

@Controller('v1/app-errors')
export class AppErrorController {
  constructor(@Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService) {}

  @Get()
  getAppErrors(): AppResponse {
    try {
      const appErrors: AppError[] = this.iAppErrorService.getAppErrors();
      return {
        statusCode: HttpStatus.OK,
        message: 'All application errors retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: appErrors,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }
}
