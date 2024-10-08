import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { AccountType } from '../../domain/enums/account-type.enum';
import { ErrorMessage } from '../../domain/enums/error-message.enum';
import 'dotenv/config';

export class CreateBankAccountDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: customerId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  customerId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: accountType` })
  @IsEnum(AccountType, { message: `${ErrorMessage.INVALID_DATA_TYPE}: accountType: CHECKING_ACCOUNT | SAVING_ACCOUNT` })
  accountType: AccountType;

  @IsOptional()
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: initialBalance` })
  @Min(0, { message: ErrorMessage.INVALID_AMOUNT })
  initialBalance?: number;
}
