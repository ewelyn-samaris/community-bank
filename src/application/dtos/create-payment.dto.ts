import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { ErrorMessage } from '../../domain/enums/error-message.enum';
import { PaymentStrategy } from '../../domain/enums/payment-strategy.enum';

export class CreatePaymentDto {
  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: amount` })
  @IsNumber({}, { message: `${ErrorMessage.INVALID_DATA_TYPE}: amount` })
  @IsPositive({ message: `${ErrorMessage.INVALID_AMOUNT}` })
  amount: number;

  @IsOptional()
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: description` })
  description?: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: customerId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: customerId` })
  customerId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: beneficiaryId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: beneficiaryId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: beneficiaryId` })
  beneficiaryAccountId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: accountId` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: accountId` })
  @IsUUID('all', { message: `${ErrorMessage.INVALID_DATA_TYPE}: accountId` })
  accountId: string;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: paymentStrategy` })
  @IsEnum(PaymentStrategy, { message: `${ErrorMessage.INVALID_DATA_TYPE}: paymentStrategy: PIX | BILL` })
  paymentStrategy: PaymentStrategy;

  @IsNotEmpty({ message: `${ErrorMessage.DATA_MUST_BE_PROVIDED}: code` })
  @IsString({ message: `${ErrorMessage.INVALID_DATA_TYPE}: code` })
  code: string;
}
