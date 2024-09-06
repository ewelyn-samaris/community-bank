import { Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { AppErrorService } from '../services/app-error.service';
import { FunctionaryService } from '../services/functionary.service';

@Injectable()
export class CreateFunctionaryValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_FUNCTIONARY;

  constructor(
    private readonly functionaryService: FunctionaryService,
    private readonly appErrorService: AppErrorService,
  ) {}

  private isValidAddimissionDate(dateStringAttribute: string, dateStringValue: string): void {
    const date: Date = new Date(dateStringValue);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      if (!(date instanceof Date))
        throw this.appErrorService.createError(
          `${ErrorMessage.INVALID_DATA_TYPE}: ${dateStringAttribute}`,
          this.errorContext,
        );
    }
    if (date > new Date())
      throw this.appErrorService.createError(ErrorMessage.DATE_CANNOT_BE_FUTURE, this.errorContext);
  }

  private doesFunctionaryAlreadyExist(cpf: string): void {
    const existfunctionary = this.functionaryService.getFunctionaryByCpf(cpf);
    if (existfunctionary)
      throw this.appErrorService.createError(ErrorMessage.FUNCTIONARY_ALREADY_EXISTS, this.errorContext);
  }

  validate(createFunctionaryDTO: CreateFunctionaryDTO): void {
    const dateStringAttribute = 'admittedOn';
    this.doesFunctionaryAlreadyExist(createFunctionaryDTO.cpf);
    this.isValidAddimissionDate(dateStringAttribute, createFunctionaryDTO.admittedOn);
  }
}
