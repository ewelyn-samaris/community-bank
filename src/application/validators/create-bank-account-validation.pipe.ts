import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateBankAccountValidationService } from '../../domain/validators/create-bank-account-validation.service';
import { CreateBankAccountDTO } from '../dtos/create-bank-account.dto';

@Injectable()
export class CreateBankAccountValidationPipe implements PipeTransform {
  constructor(private readonly createBankAccountValidationService: CreateBankAccountValidationService) {}

  transform(value: CreateBankAccountDTO, metadata: ArgumentMetadata) {
    try {
      this.createBankAccountValidationService.validate(value);
      return value;
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }
}
