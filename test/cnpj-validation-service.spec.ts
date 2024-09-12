import { ErrorContext } from '../src/domain/enums/error-context.enum';
import { CnpjValidationService } from '../src/domain/validators/cnpj-validation.service';

describe('Validate CNPJ', () => {
  test('Shoud pass when CNPJ is valid #verifyCheckDigit', () => {
    const cnpj = '31232136000150';
    const mySpy = jest.spyOn(CnpjValidationService, 'verifyCheckDigit');

    CnpjValidationService.validate(cnpj, ErrorContext.TEST);
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(expect(CnpjValidationService.verifyCheckDigit(cnpj)).toBe(true));
  });

  test('Should not pass when CNPJ in invalid #verifyCheckDigit', () => {
    const cnpj = '31232.136000188';
    expect(CnpjValidationService.verifyCheckDigit(cnpj)).toBe(false);
  });
});
