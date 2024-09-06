import { Controller, UsePipes, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { CpfValidationPipe } from '../validators/cpf-validation.pipe';
import { AppResponse } from '../../domain/models/app-response.model';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CustomerCreationRequest } from '../../domain/entities/customer-creation-request.entity';
import { CustomerCreationRequestService } from '../../domain/services/customer-creation-request.service';

@Controller('v1/customer-creation-requests')
export class CustomerCreationRequestController {
  constructor(private readonly customerCreationRequestService: CustomerCreationRequestService) {}

  @Get()
  getAllCustomerCreationRequests(): AppResponse {
    try {
      const customerCreationRequests: CustomerCreationRequest[] = this.customerCreationRequestService.getAllRequests();
      return {
        statusCode: HttpStatus.OK,
        message: `Customer-creation-requests retrieved successfully`,
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customerCreationRequests,
      };
    } catch (error) {
      throw new NotFoundException(`No customer-creation-request found`);
    }
  }

  @Get(':cpf')
  @UsePipes(CpfValidationPipe)
  getAllCreationCustomerRequests(@Param('cpf') cpf: string): AppResponse {
    try {
      const customerCreationRequest: CustomerCreationRequest = this.customerCreationRequestService.getRequestByCpf(cpf);
      return {
        statusCode: HttpStatus.OK,
        message: `Creation-customer-request retrieved successfully for the cpf: ${cpf}`,
        date: DataFormatterAdapter.formatDateTimeString(),
        data: customerCreationRequest,
      };
    } catch (error) {
      throw new NotFoundException(`No customer-creation-request found for cpf: ${cpf}`);
    }
  }
}
