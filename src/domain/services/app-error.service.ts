import { Injectable } from '@nestjs/common';
import { AppError } from '../entities/app-error.entity';
import { ErrorContext } from '../enums/error-context.enum';
import { AppErrorFactory } from '../factories/app-error.factory';

@Injectable()
export class AppErrorService {
  getAppErrors(): AppError[] {
    return AppError.errors;
  }

  createError(errorMessage: string, errorContext: ErrorContext): AppError {
    const appError: AppError = AppErrorFactory.create(errorMessage, errorContext);
    return appError;
  }
}
