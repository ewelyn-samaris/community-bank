import { HttpStatus } from '@nestjs/common';
import { BankAccount } from '../entities/bank-account/bank-account.entity';
import { Transaction } from '../entities/transaction/transaction.entity';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';
import { Payment } from '../entities/payment/payment.entity';
import { Customer } from '../entities/customer/customer.entity';
import { Functionary } from '../entities/functionary/functionary.entity';

export class AppResponse {
  statusCode: HttpStatus;
  message: string;
  date: string;
  data?:
    | BankAccount
    | BankAccount[]
    | Functionary
    | Functionary[]
    | Customer
    | Customer[]
    | CustomerCreationRequest
    | CustomerCreationRequest[]
    | Transaction
    | Transaction[]
    | Payment
    | Payment[];
}
