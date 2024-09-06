import { Controller, HttpStatus, UsePipes } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Body, Param, Get, Post } from '@nestjs/common';
import { CreateTransactionValidationPipe } from '../validators/create-transaction-validation.pipe';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { AppResponse } from '../../domain/models/app-response.model';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { TransactionService } from '../../domain/services/transaction.service';
import { Transaction } from '../../domain/entities/transaction.entity';

@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(CreateTransactionValidationPipe)
  createTransaction(@Body() createTransactionDTO: CreateTransactionDTO): AppResponse {
    try {
      const transaction = this.transactionService.execute(createTransactionDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Transaction created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: transaction,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't create transaction. Internal server error");
    }
  }

  @Get('bank-account/:id')
  getBankStatement(@Param('id') accountID: string): AppResponse {
    try {
      const bankStatement: Transaction[] = this.transactionService.getLastTransactionsByAccountID(accountID);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank statement retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: bankStatement,
      };
    } catch (error) {
      throw new NotFoundException('Bank statement not found');
    }
  }
}
