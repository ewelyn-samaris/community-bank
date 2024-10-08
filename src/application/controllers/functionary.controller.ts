import { Controller, Inject, Param, UsePipes } from '@nestjs/common';
import { Post, Body, Get } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreateFunctionaryDTO } from '../dtos/create-functionary.dto';
import { CreateFunctionaryValidationPipe } from '../validators/create-functionary-validation.pipe';
import { IFunctionaryService } from '../../domain/interfaces/functionary/functionary-service.interface';
import { Functionary } from '../../domain/entities/functionary/functionary.entity';
import { NationalIdentifierValidationPipe } from '../validators/national-identifier-validation.pipe';

@Controller('v1/functionaries')
export class FunctionaryController {
  constructor(@Inject('IFunctionaryService') private readonly iFunctionaryService: IFunctionaryService) {}

  @Get()
  getAllFunctionaries(): AppResponse {
    try {
      const functionaries = this.iFunctionaryService.getFunctionaries();
      return {
        statusCode: HttpStatus.OK,
        message: 'All functionaries retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: functionaries,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No functionaries found`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':cpf')
  @UsePipes(NationalIdentifierValidationPipe)
  getFunctionaryById(@Param() cpf: string): AppResponse {
    try {
      this.iFunctionaryService.getFunctionaryByCpf(cpf);
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No functionary found with the given cpf #${cpf}`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Post()
  @UsePipes(CreateFunctionaryValidationPipe)
  create(@Body() createFunctionaryDTO: CreateFunctionaryDTO): AppResponse {
    try {
      const functionary: Functionary = this.iFunctionaryService.createFunctionary(createFunctionaryDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Functionary created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: functionary,
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
