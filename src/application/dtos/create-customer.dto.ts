import { IsEnum, IsNumber, IsPositive, IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { ErrorMessage } from '../../domain/enums/error-message.enum';
import { ManagedRegion } from '../../domain/enums/managed-regions.enum';
import 'dotenv/config';

export class CreateCustomerDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: name` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: ErrorMessage.INVALID_NAME })
  name: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: cpf` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: cpf` })
  @Length(11, 11, { message: ErrorMessage.INVALID_CPF })
  cpf: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: cellphone` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: cellphone` })
  @Matches(/^(\+55|0055)?(?:\d{2}[9]\d{4}\d{4})?$/, { message: ErrorMessage.INVALID_CELLPHONE_NUMBER })
  cellphone: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: address` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: address` })
  address: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: averageIncome` })
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: averageIncome` })
  @IsPositive({ message: ErrorMessage.INVALID_AMOUNT })
  averageIncome: number;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: region` })
  @IsEnum(ManagedRegion, { message: `${ErrorMessage.INVALID_DATA_TYPE}: region` })
  region: ManagedRegion;
}
