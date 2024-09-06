import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePaymentValidationService } from '../../domain/validators/create-payment-validation.service';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class CreatePaymentValidationPipe implements PipeTransform {
  constructor(private readonly createPaymentValidationService: CreatePaymentValidationService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.createPaymentValidationService.validate(value);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      });
    }
  }
}
