import { CpfValidationService } from '../src/domain/validators/cpf-validation.service';
import { ErrorContext } from '../src/domain/enums/error-context.enum';
import { ErrorMessage } from '../src/domain/enums/error-message.enum';

describe('Validate CPF', () => {
  test('Shoud pass when CPF is valid', () => {
    const cpf = '52543986049';
    const mySpy = jest.spyOn(CpfValidationService, 'verifyCheckDigits');

    CpfValidationService.validate(cpf, ErrorContext.TEST);
    expect(mySpy).toHaveBeenCalled();
    expect(CpfValidationService.verifyCheckDigits(cpf)).toBe(true);
  });

  test('Should not pass when CPF is invalid', () => {
    const cpf = '52543986040';
    const mySpy = jest.spyOn(CpfValidationService, 'verifyCheckDigits');

    expect(() => CpfValidationService.validate(cpf, ErrorContext.TEST)).toThrowError(
      `${ErrorContext.TEST} - ${ErrorMessage.INVALID_CPF}`,
    );
    expect(mySpy).toHaveBeenCalled();
    expect(CpfValidationService.verifyCheckDigits(cpf)).toBe(false);
  });

  test.only('Should not pass when CPF is invalid with equal digits', () => {
    const cpf = '88888888888';

    expect(() => CpfValidationService.isInvalidCPFWithEqualDigits(cpf, ErrorContext.TEST)).toThrowError(
      `${ErrorContext.TEST} - ${ErrorMessage.INVALID_CPF}`,
    );
  });
});
