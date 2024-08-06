import { Controller, UsePipes } from '@nestjs/common';
import { Post, Body, Get } from '@nestjs/common';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreateFunctionaryDTO } from '../dtos/create-functionary.dto';
import { Functionary } from '../../domain/entities/functionary.entity';
import { CreateFunctionaryValidationPipe } from '../validators/create-functionary-validation.pipe';
import { FunctionaryService } from '../../domain/services/functionary.service';

@Controller('v1/functionaries')
export class FunctionaryController {
  constructor(private readonly functionaryService: FunctionaryService) {}

  @Get()
  getAllFunctionaries(): AppResponse {
    try {
      const functionaries = this.functionaryService.getFunctionaries();

      return {
        statusCode: HttpStatus.OK,
        message: 'All functionaries retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: functionaries,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't retrieve functionaries. Internal server error");
    }
  }

  @Post()
  @UsePipes(CreateFunctionaryValidationPipe)
  create(@Body() createFunctionaryDTO: CreateFunctionaryDTO): AppResponse {
    try {
      const functionary: Functionary = this.functionaryService.createFunctionary(createFunctionaryDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Functionary created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: functionary,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't create functionary. Internal server error");
    }
  }
}
