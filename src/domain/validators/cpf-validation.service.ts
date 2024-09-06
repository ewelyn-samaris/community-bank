import { Inject, Injectable } from '@nestjs/common';
import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';
import { IAppErrorService } from '../interfaces/apperror-service.interface';

@Injectable()
export class CpfValidationService {
  private DEFAULT_CPF_LENGTH: number = 11;
  private ALL_NUMBERS_IDENTICALS: RegExp = /^(\d)\1{10}$/;
  private CPF_BASE_START_INDEX: number = 0;
  private CPF_BASE_END_INDEX: number = 9;

  constructor(@Inject('IAppErrorService') private readonly iAppErrorService: IAppErrorService) {}

  private isInvalidCPFWithEqualDigits(cpf: string, validationContext: ErrorContext): void {
    if (this.ALL_NUMBERS_IDENTICALS.test(cpf))
      throw this.iAppErrorService.createError(ErrorMessage.INVALID_CPF, validationContext);
  }

  private calculateCheckDigit(base: string): number {
    let sum: number = 0;

    base.split('').forEach((charNumber, index) => {
      sum += parseInt(charNumber) * (base.length + 1 - index);
    });

    let remainder = sum % this.DEFAULT_CPF_LENGTH;
    const maxValueToZeroCheckDigit = 2;
    return remainder < maxValueToZeroCheckDigit ? 0 : this.DEFAULT_CPF_LENGTH - remainder;
  }

  private verifyCheckDigits(cpf: string, validationContext: ErrorContext): void {
    const firstCheckDigit = this.calculateCheckDigit(cpf.substring(this.CPF_BASE_START_INDEX, this.CPF_BASE_END_INDEX));
    const secondCheckDigit = this.calculateCheckDigit(
      cpf.substring(this.CPF_BASE_START_INDEX, this.CPF_BASE_END_INDEX + 1),
    );

    if (!cpf.endsWith(`${firstCheckDigit}${secondCheckDigit}`)) {
      throw this.iAppErrorService.createError(ErrorMessage.INVALID_CPF, validationContext);
    }
  }

  validate(cpf: string, validationContext: ErrorContext): void {
    this.isInvalidCPFWithEqualDigits(cpf, validationContext);
    this.verifyCheckDigits(cpf, validationContext);
  }
}
