import { ErrorMessage } from '../enums/error-message.enum';
import { ErrorContext } from '../enums/error-context.enum';

export class CnpjValidationService {
  private static calculateCheckDigit(base: string, validationNumbersArray: number[]) {
    let sum = 0;

    for (let i = 0; i < base.length; ++i) {
      sum += parseInt(base[i]) * validationNumbersArray[i];
    }

    const baseValueForValidation = 11;
    const remainder = sum % baseValueForValidation;
    const maxValueToZeroCheckDigit = 2;
    return remainder < maxValueToZeroCheckDigit ? 0 : baseValueForValidation - remainder;
  }

  static verifyCheckDigit(cnpj: string): boolean {
    const base = cnpj.substring(0, 12);
    const validationNumbersForFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const validationNumbersForSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const firstCheckDigit = this.calculateCheckDigit(base, validationNumbersForFirstDigit);
    const secondCheckDigit = this.calculateCheckDigit(
      base.concat(firstCheckDigit.toString()),
      validationNumbersForSecondDigit,
    );
    return cnpj.endsWith(`${firstCheckDigit}${secondCheckDigit}`);
  }

  static validate(cnpj: string, errorContext: ErrorContext): void {
    const isValidCNPJ = this.verifyCheckDigit(cnpj);
    if (!isValidCNPJ) {
      throw new Error(`${errorContext} - ${ErrorMessage.INVALID_CNPJ}`);
    }
  }
}
