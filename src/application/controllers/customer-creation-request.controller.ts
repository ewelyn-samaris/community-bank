import { Controller, UsePipes, HttpStatus, Inject } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { NationalIdentifierValidationPipe } from '../validators/national-identifier-validation.pipe';
import { AppResponse } from '../../domain/models/app-response.model';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CustomerCreationRequest } from '../../domain/entities/customer-creation-request.entity';
import { ICustomerCreationRequestService } from '../../domain/interfaces/customer-creation-request-service.interface';

@Controller('v1/customer-creation-requests')
export class CustomerCreationRequestController {
  constructor(
    @Inject('ICustomerCreationRequestService')
    private readonly iCustomerCreationRequestService: ICustomerCreationRequestService,
  ) {}

  @Get()
  getAllCustomerCreationRequests(): AppResponse {
    try {
      const customerCreationRequests: CustomerCreationRequest[] = this.iCustomerCreationRequestService.getAllRequests();
      return {
        statusCode: HttpStatus.OK,
        message: `Customer-creation-requests retrieved successfully`,
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customerCreationRequests,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':nationalIdentifier')
  @UsePipes(NationalIdentifierValidationPipe)
  getAllCreationCustomerRequests(@Param('nationalIdentifier') nationalIdentifier: string): AppResponse {
    try {
      const customerCreationRequest: CustomerCreationRequest =
        this.iCustomerCreationRequestService.getLastRequestByNationalIdentifier(nationalIdentifier);
      return {
        statusCode: HttpStatus.OK,
        message: `Creation-customer-request retrieved successfully for the identifier: ${nationalIdentifier}`,
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customerCreationRequest,
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
