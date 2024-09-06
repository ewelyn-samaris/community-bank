import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { CreateCustomerValidationService } from '../../domain/validators/create-customer-validation.service';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { ErrorContext } from '../../domain/enums/error-context.enum';

@Injectable()
export class CreateCustomerValidationPipe implements PipeTransform {
  constructor(
    private readonly createCustomerValidationService: CreateCustomerValidationService,
    private readonly cpfValidationService: CpfValidationService,
  ) {}

  transform(value: CreateCustomerDTO, metadata: ArgumentMetadata) {
    try {
      this.cpfValidationService.validate(value.cpf, ErrorContext.CREATE_CUSTOMER);
      this.createCustomerValidationService.validate(value);
      return value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
