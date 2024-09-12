import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { ErrorContext } from '../../domain/enums/error-context.enum';
import { CnpjValidationService } from '../../domain/validators/cnpj-validation.service';
import { NationalIdentifierLengths } from '../../domain/enums/national-identifier-lengths.enum';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class NationalIdentifierValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    try {
      if (value.length === NationalIdentifierLengths.CNPJ) {
        CnpjValidationService.validate(value, ErrorContext.GET_DATA_BY_NATIONAL_IDENTIFIER);
      } else {
        CpfValidationService.validate(value, ErrorContext.GET_DATA_BY_NATIONAL_IDENTIFIER);
      }
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
