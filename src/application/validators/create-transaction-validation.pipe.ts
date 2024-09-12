import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { CreateTransactionValidationService } from '../../domain/validators/create-transaction-validation.service';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class CreateTransactionValidationPipe implements PipeTransform {
  constructor(private readonly createTransactionValidationService: CreateTransactionValidationService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.createTransactionValidationService.validate(value);
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
