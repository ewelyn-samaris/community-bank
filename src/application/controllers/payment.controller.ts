import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { HttpStatus, Inject, UsePipes } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IPaymentService } from '../../domain/interfaces/payment/payment-service.interface';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CreatePaymentValidationService } from '../../domain/validators/create-payment-validation.service';
import { Payment } from '../../domain/entities/payment/payment.entity';

@Controller('v1/payments')
export class PaymentController {
  constructor(@Inject('IPaymentService') private readonly ipaymentService: IPaymentService) {}

  @Post()
  @UsePipes(CreatePaymentValidationService)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<AppResponse<Payment>> {
    try {
      const payment = await this.ipaymentService.execute(createPaymentDto);
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
  async getPaymentsByAccountId(@Param('accountId') accountId: string): Promise<AppResponse<Payment>> {
    try {
      const payments = await this.ipaymentService.getPaymentsByAccountId(accountId);
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
