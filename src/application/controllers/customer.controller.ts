import { Body, Controller, Inject, UsePipes } from '@nestjs/common';
import { Param, Post } from '@nestjs/common';
import { Get, HttpStatus } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { NationalIdentifierValidationPipe } from '../validators/national-identifier-validation.pipe';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { CreateCustomerValidationPipe } from '../validators/create-customer-validation.pipe';
import { ICustomerService } from '../../domain/interfaces/customer-service.interface';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { IEventManager } from '../../domain/interfaces/event-manager.interface';
import { IObserver } from '../../domain/interfaces/observer.interface';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
    @Inject('IObserver') private readonly iSavingAccountService: IObserver,
    @Inject('IEventManager') private readonly iEventManager: IEventManager,
  ) {
    this.iEventManager.subscribe(this.iSavingAccountService);
  }

  @Post()
  @UsePipes(CreateCustomerValidationPipe)
  createCustomer(@Body() CreateCustomerDTO: CreateCustomerDTO): AppResponse {
    try {
      const customer: Customer = this.iCustomerService.createCustomer(CreateCustomerDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Customer created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customer,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get()
  getAllCustomers(): AppResponse {
    try {
      const customers: Customer[] = this.iCustomerService.getCustomers();
      return {
        statusCode: HttpStatus.OK,
        message: 'Customers retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customers,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No customers found`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':nationalIdentifier')
  @UsePipes(NationalIdentifierValidationPipe)
  getCustomerByCpf(@Param('nationalIdentifier') nationalIdentifier: string): AppResponse {
    try {
      const customer: Customer = this.iCustomerService.getCustomerByNationalIdentifier(nationalIdentifier);
      return {
        statusCode: HttpStatus.OK,
        message: 'Customer retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customer,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No customer found with the given national-identifier #${nationalIdentifier}`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }
}
