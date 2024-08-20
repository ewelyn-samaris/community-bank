import { IsEnum, IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { AccountType } from '../../domain/enums/account-type.enum';
import { ErrorMessage } from '../../domain/enums/error-message.enum';

export class UpdateBankAccountTypeDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: customerId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  customerId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: accountTypeToChangeTo` })
  @IsEnum(AccountType, {
    message: `${ErrorMessage.INVALID_DATA_TYPE}: accountTypeToChangeTo: CHECKING_ACCOUNT | SAVING_ACCOUNT`,
  })
  accountTypeToChangeTo: AccountType;
}
