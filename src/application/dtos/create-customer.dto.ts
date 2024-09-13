import { ErrorMessage } from '../../domain/enums/error-message.enum';
import { ManagedRegion } from '../../domain/enums/managed-regions.enum';
import { IsEnum, IsNumber, IsPositive, IsString, Matches, IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: name` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: ErrorMessage.INVALID_NAME })
  name: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: cpf or cnpj` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: cpf or cnpj` })
  @Matches(/^\d{11}$|^\d{14}$/, { message: ErrorMessage.INVALID_CPF })
  nationalIdentifier: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: cellphone` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: cellphone` })
  @Matches(/^(\+55|0055)?(?:\d{2}[9]\d{4}\d{4})?$/, { message: ErrorMessage.INVALID_CELLPHONE_NUMBER })
  telephone: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: address` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: address` })
  address: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: averageIncome` })
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: averageIncome` })
  @IsPositive({ message: ErrorMessage.INVALID_AMOUNT })
  averageCapital: number;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: region` })
  @IsEnum(ManagedRegion, {
    message: `${ErrorMessage.INVALID_DATA_TYPE}: region: NORTE | NORDESTE | CENTRO_OESTE | SUDESTE | SUL`,
  })
  region: ManagedRegion;
}
