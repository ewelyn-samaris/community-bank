import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { HttpStatus, Inject, UsePipes } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IPaymentService } from '../../domain/interfaces/payment/payment-service.interface';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CreatePaymentValidationService } from '../../domain/validators/create-payment-validation.service';

@Controller('v1/payments')
export class PaymentController {
  constructor(@Inject('IPaymentService') private readonly ipaymentService: IPaymentService) {}

  @Post()
  @UsePipes(CreatePaymentValidationService)
  createPayment(@Body() createPaymentDto: CreatePaymentDto): AppResponse {
    try {
      const payment = this.ipaymentService.execute(createPaymentDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Payment processed successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: payment,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':accountId')
  getPaymentsByAccountId(@Param('accountId') accountId: string): AppResponse {
    try {
      const payments = this.ipaymentService.getPaymentsByAccountId(accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Payments retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: payments,
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
