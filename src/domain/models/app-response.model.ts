import { HttpStatus } from '@nestjs/common';
import { Functionary } from '../entities/functionary.entity';
import { Customer } from '../entities/customer.entity';
import { AppError } from '../entities/app-error.entity';
import { BankAccount } from '../entities/bank-account.entity';
import { Transaction } from '../entities/transaction.entity';
import { CustomerCreationRequest } from '../entities/customer-creation-request.entity';

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
    | AppError[];
}
