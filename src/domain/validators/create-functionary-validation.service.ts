import { Inject, Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { IAppErrorService } from '../interfaces/apperror-service.interface';
import { IFunctionaryService } from '../interfaces/functionary/functionary-service.interface';

@Injectable()
export class CreateFunctionaryValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_FUNCTIONARY;

  constructor(
    @Inject('IFunctionaryService') private readonly iFunctionaryService: IFunctionaryService,
    @Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService,
  ) {}

  private isValidAddimissionDate(dateStringAttribute: string, dateStringValue: string): void {
    const date: Date = new Date(dateStringValue);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw this.iAppErrorService.createError(
        `${ErrorMessage.INVALID_DATA_TYPE}: ${dateStringAttribute}`,
        this.errorContext,
      );
    }
    if (date > new Date()) {
      throw this.iAppErrorService.createError(ErrorMessage.DATE_CANNOT_BE_FUTURE, this.errorContext);
    }
  }

  private doesFunctionaryAlreadyExist(cpf: string): void {
    const existfunctionary = this.iFunctionaryService.getFunctionaryByCpf(cpf);
    if (existfunctionary) {
      throw this.iAppErrorService.createError(ErrorMessage.FUNCTIONARY_ALREADY_EXISTS, this.errorContext);
    }
  }

  validate(createFunctionaryDTO: CreateFunctionaryDTO): void {
    const dateStringAttribute = 'admittedOn';
    this.doesFunctionaryAlreadyExist(createFunctionaryDTO.cpf);
    this.isValidAddimissionDate(dateStringAttribute, createFunctionaryDTO.admittedOn);
  }
}
