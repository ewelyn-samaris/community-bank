import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CpfValidationService } from '../../domain/validators/cpf-validation.service';
import { ErrorContext } from '../../domain/enums/error-context.enum';

@Injectable()
export class CpfValidationPipe implements PipeTransform {
  constructor(private readonly cpfValidationService: CpfValidationService) {}

  transform(value: string, metadata: ArgumentMetadata) {
    try {
      this.cpfValidationService.validate(value, ErrorContext.GET_DATA_BY_CPF);
      return value;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
