import { v4 as uuidv4 } from 'uuid';
import { ErrorContext } from '../enums/error-context.enum';

export class AppError {
  static errors: AppError[] = [];
  public id: string;
  public error: string;
  public errorContext: ErrorContext;
  public createdAt: Date;

  constructor(errorMessage: string, errorContext: ErrorContext) {
    this.id = uuidv4();
    this.error = errorMessage;
    this.errorContext = errorContext;
    this.createdAt = new Date();

    AppError.errors.push(this);
  }
}
