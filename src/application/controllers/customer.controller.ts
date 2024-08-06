import { Body, Controller, UsePipes } from '@nestjs/common';
import { Param, Post, Query } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Get, HttpStatus } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { CustomerService } from '../../domain/services/customer.service';
import { Customer } from '../../domain/entities/customer.entity';
import { CpfValidationPipe } from '../validators/cpf-validation.pipe';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { CreateCustomerValidationPipe } from '../validators/create-customer-validation.pipe';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(CreateCustomerValidationPipe)
  createCustomer(@Body() CreateCustomerDTO: CreateCustomerDTO): AppResponse {
    try {
      const customer: Customer = this.customerService.createCustomer(CreateCustomerDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Customer created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customer,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer. Internal server error`);
    }
  }

  @Get()
  getAllCustomers(): AppResponse {
    try {
      const customers: Customer[] = this.customerService.getCustomers();
      return {
        statusCode: HttpStatus.OK,
        message: 'Customers retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customers,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't retrieve customers. Internal server error");
    }
  }

  @Get(':cpf')
  @UsePipes(CpfValidationPipe)
  getCustomerByCpf(@Param('cpf') customerCpf: string): AppResponse {
    try {
      const customer: Customer = this.customerService.getCustomerByCpf(customerCpf);
      // console.log(`Customer: ${customer}`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Customer retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customer,
      };
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }
}
