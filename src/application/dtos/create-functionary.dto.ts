import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Length, Matches, Min, ValidateIf } from 'class-validator';
import { ManagedRegion } from '../../domain/enums/managed-regions.enum';
import { OfficeTypes } from '../../domain/enums/office-types.enum';
import { ErrorMessage } from '../../domain/enums/error-message.enum';
import 'dotenv/config';

export class CreateFunctionaryDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: cpf` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: cpf` })
  @Length(11, 11, { message: ErrorMessage.INVALID_CPF })
  cpf: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: name` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: ErrorMessage.INVALID_NAME })
  name: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: admittedOn` })
  @IsDateString({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: admittedOn` })
  admittedOn: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: salary` })
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: salary` })
  @Min(parseFloat(process.env.BASE_SALARY), { message: ErrorMessage.INVALID_SALARY })
  salary: number;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: office` })
  @IsEnum(OfficeTypes, { message: `${ErrorMessage.INVALID_DATA_TYPE}: office` })
  office: OfficeTypes;

  @ValidateIf((obj) => obj.office === OfficeTypes.ACCOUNT_MANAGER)
  @IsEnum(ManagedRegion, { message: `${ErrorMessage.INVALID_DATA_TYPE}: managedRegion` })
  managedRegion?: ManagedRegion;
}
