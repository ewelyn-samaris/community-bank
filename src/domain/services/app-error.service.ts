import { Injectable, NotFoundException } from '@nestjs/common';
import { AppError } from '../entities/app-error.entity';
import { ErrorContext } from '../enums/error-context.enum';
import { AppErrorFactory } from '../factories/app-error.factory';
import { IAppErrorService } from '../interfaces/apperror-service.interface';

@Injectable()
export class AppErrorService implements IAppErrorService {
  getAppErrors(): AppError[] {
    const errors = AppError.errors;
    if (!errors.length) {
      throw new NotFoundException(`No errors found`);
    }
    return errors;
  }

  createError(errorMessage: string, errorContext: ErrorContext): AppError {
    const appError: AppError = AppErrorFactory.create(errorMessage, errorContext);
    return appError;
  }
}
