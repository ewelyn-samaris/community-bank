import { AppError } from '../entities/app-error.entity';
import { ErrorContext } from '../enums/error-context.enum';

export interface IAppErrorService {
  getAppErrors(): AppError[];
  createError(errorMessage: string, errorContext: ErrorContext): AppError;
}
