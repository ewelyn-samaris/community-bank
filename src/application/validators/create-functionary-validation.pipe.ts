import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { CreateFunctionaryValidationService } from '../../domain/validators/create-functionary-validation.service';
import { CreateFunctionaryDTO } from '../dtos/create-functionary.dto';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { ErrorContext } from '../../domain/enums/error-context.enum';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class CreateFunctionaryValidationPipe implements PipeTransform {
  constructor(
    private readonly cpfValidationService: CpfValidationService,
    private readonly createFunctionaryValidationService: CreateFunctionaryValidationService,
  ) {}

  transform(value: CreateFunctionaryDTO, metadata: ArgumentMetadata) {
    try {
      this.cpfValidationService.validate(value.cpf, ErrorContext.CREATE_FUNCTIONARY);
      this.createFunctionaryValidationService.validate(value);
      return value;
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      });
    }
  }
}
