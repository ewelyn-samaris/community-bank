import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { CreateCustomerValidationService } from '../../domain/validators/create-customer-validation.service';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { ErrorContext } from '../../domain/enums/error-context.enum';
import { CnpjValidationService } from '../../domain/validators/cnpj-validation.service';
import { NationalIdentifierLengths } from '../../domain/enums/national-identifier-lengths.enum';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class CreateCustomerValidationPipe implements PipeTransform {
  constructor(
    private readonly createCustomerValidationService: CreateCustomerValidationService,
    private readonly cpfValidationService: CpfValidationService,
    private readonly cnpjValidationService: CnpjValidationService,
  ) {}

  transform(value: CreateCustomerDTO, metadata: ArgumentMetadata) {
    try {
      if (value.nationalIdentifier.length === NationalIdentifierLengths.CNPJ) {
        this.cnpjValidationService.validate(value.nationalIdentifier, ErrorContext.CREATE_CUSTOMER);
      } else {
        this.cpfValidationService.validate(value.nationalIdentifier, ErrorContext.CREATE_CUSTOMER);
      }

      this.createCustomerValidationService.validate(value.nationalIdentifier);
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
