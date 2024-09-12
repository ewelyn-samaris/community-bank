import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { CreateBankAccountValidationService } from '../../domain/validators/create-bank-account-validation.service';
import { CreateBankAccountDTO } from '../dtos/create-bank-account.dto';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';

@Injectable()
export class CreateBankAccountValidationPipe implements PipeTransform {
  constructor(private readonly createBankAccountValidationService: CreateBankAccountValidationService) {}

  transform(value: CreateBankAccountDTO, metadata: ArgumentMetadata) {
    try {
      this.createBankAccountValidationService.validate(value);
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
