import { v4 as uuidv4 } from 'uuid';
import { ErrorContext } from '../enums/error-context.enum';

export class AppError extends Error {
  static errors: AppError[] = [];
  public id: string;
  public message: string;
  public errorContext: ErrorContext;
  public createdAt: Date;

  constructor(errorMessage: string, errorContext: ErrorContext) {
    super();
    this.id = uuidv4();
    this.message = errorMessage;
    this.errorContext = errorContext;
    this.createdAt = new Date();

    AppError.errors.push(this);
  }
}
