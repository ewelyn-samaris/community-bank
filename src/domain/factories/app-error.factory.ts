import { AppError } from '../entities/app-error.entity';
import { ErrorContext } from '../enums/error-context.enum';

export abstract class AppErrorFactory {
  static create(errorMessage: string, errorContext: ErrorContext): AppError {
    return new AppError(errorMessage, errorContext);
  }
}
