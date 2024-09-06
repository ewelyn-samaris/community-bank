import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateTransactionValidationService } from '../../domain/validators/create-transaction-validation.service';

@Injectable()
export class CreateTransactionValidationPipe implements PipeTransform {
  constructor(private readonly createTransactionValidationService: CreateTransactionValidationService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.createTransactionValidationService.validate(value);
      return value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
