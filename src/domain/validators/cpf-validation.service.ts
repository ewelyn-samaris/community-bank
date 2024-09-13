import { ErrorContext } from '../enums/error-context.enum';
import { ErrorMessage } from '../enums/error-message.enum';

export class CpfValidationService {
  static isInvalidCPFWithEqualDigits(cpf: string, validationContext: ErrorContext): void {
    const ALL_NUMBERS_IDENTICALS: RegExp = /^(\d)\1{10}$/;
    if (ALL_NUMBERS_IDENTICALS.test(cpf)) throw new Error(`${validationContext} - ${ErrorMessage.INVALID_CPF}`);
  }

  private static calculateCheckDigit(base: string): number {
    const DEFAULT_CPF_LENGTH: number = 11;
    let sum: number = 0;

    base.split('').forEach((charNumber, index) => {
      sum += parseInt(charNumber) * (base.length + 1 - index);
    });

    let remainder = sum % DEFAULT_CPF_LENGTH;
    const maxValueToZeroCheckDigit = 2;
    return remainder < maxValueToZeroCheckDigit ? 0 : DEFAULT_CPF_LENGTH - remainder;
  }

  static verifyCheckDigits(cpf: string): boolean {
    const CPF_BASE_START_INDEX: number = 0;
    const CPF_BASE_END_INDEX: number = 9;

    const firstCheckDigit = this.calculateCheckDigit(cpf.substring(CPF_BASE_START_INDEX, CPF_BASE_END_INDEX));
    const secondCheckDigit = this.calculateCheckDigit(cpf.substring(CPF_BASE_START_INDEX, CPF_BASE_END_INDEX + 1));

    return cpf.endsWith(`${firstCheckDigit}${secondCheckDigit}`);
  }

  static validate(cpf: string, validationContext: ErrorContext): void {
    this.isInvalidCPFWithEqualDigits(cpf, validationContext);
    if (!this.verifyCheckDigits(cpf)) {
      throw new Error(`${validationContext} - ${ErrorMessage.INVALID_CPF}`);
    }
  }
}
