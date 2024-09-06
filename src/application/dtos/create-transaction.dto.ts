import { ErrorMessage } from 'src/domain/enums/error-message.enum';
import { TransactionType } from '../../domain/enums/transaction-type.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTransactionDTO {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: type` })
  @IsEnum(TransactionType, { message: `${ErrorMessage.INVALID_DATA_TYPE}: type` })
  type: TransactionType;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: amount` })
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: amount` })
  @IsPositive({ message: ErrorMessage.INVALID_AMOUNT })
  amount: number;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: accountId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: accountId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: accountId` })
  accountId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: customerId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  customerId: string;

  @ValidateIf((obj) => obj.type === TransactionType.TRANSFER)
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: destinationAccountId` })
  @IsString({ message: `{ErrorMessage.INVALID_DATA_TYPE}: destinationAccountId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: destinationAccountId` })
  destinationAccountId?: string;
}
