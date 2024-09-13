import { Controller, HttpStatus, Inject, UsePipes } from '@nestjs/common';
import { Body, Param, Get, Post } from '@nestjs/common';
import { CreateTransactionValidationPipe } from '../validators/create-transaction-validation.pipe';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { AppResponse } from '../../domain/models/app-response.model';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { Transaction } from '../../domain/entities/transaction/transaction.entity';
import { ITransactionService } from '../../domain/interfaces/transaction/transaction-service.interface';

@Controller('v1/transactions')
export class TransactionController {
  constructor(@Inject('ITransactionService') private readonly iTransactionService: ITransactionService) {}

  @Post()
  @UsePipes(CreateTransactionValidationPipe)
  async createTransaction(@Body() createTransactionDTO: CreateTransactionDTO): Promise<AppResponse<Transaction>> {
    try {
      const transaction = await this.iTransactionService.execute(createTransactionDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Transaction created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: transaction,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get('bank-account/:id')
  async getBankStatement(@Param('id') accountID: string): Promise<AppResponse<Transaction>> {
    try {
      const bankStatement: Transaction[] = await this.iTransactionService.getLastTransactionsByAccountId(accountID);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank statement retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: bankStatement,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }
}
