import { Inject, Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { CreateFunctionaryDTO } from '../../application/dtos/create-functionary.dto';
import { IFunctionaryService } from '../interfaces/functionary/functionary-service.interface';

@Injectable()
export class CreateFunctionaryValidationService {
  private errorContext: ErrorContext = ErrorContext.CREATE_FUNCTIONARY;

  constructor(@Inject('IFunctionaryService') private readonly iFunctionaryService: IFunctionaryService) {}

  private isValidAddimissionDate(dateStringAttribute: string, dateStringValue: string): void {
    const date: Date = new Date(dateStringValue);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.INVALID_DATA_TYPE}: ${dateStringAttribute}`);
    }
    if (date > new Date()) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.DATE_CANNOT_BE_FUTURE}`);
    }
  }

  private async doesFunctionaryAlreadyExist(cpf: string): Promise<void> {
    const existfunctionary = await this.iFunctionaryService.getFunctionaryByCpf(cpf);
    if (existfunctionary) {
      throw new Error(`${this.errorContext} - ${ErrorMessage.FUNCTIONARY_ALREADY_EXISTS}`);
    }
  }

  async validate(createFunctionaryDTO: CreateFunctionaryDTO): Promise<void> {
    const dateStringAttribute = 'admittedOn';
    await this.doesFunctionaryAlreadyExist(createFunctionaryDTO.cpf);
    this.isValidAddimissionDate(dateStringAttribute, createFunctionaryDTO.admittedOn);
  }
}
