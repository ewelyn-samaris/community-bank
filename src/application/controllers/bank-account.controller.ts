import { Controller, UsePipes, HttpStatus, Inject } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreateBankAccountDTO } from '../dtos/create-bank-account.dto';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CreateBankAccountValidationPipe } from '../validators/create-bank-account-validation.pipe';
import { UpdateBankAccountTypeDTO } from '../dtos/update-bank-account.dto';
import { UpdateBankAccountTypeValidationService } from '../../domain/validators/update-bank-account-type-validation.service';
import { BankAccount } from '../../domain/entities/bank-account/bank-account.entity';
import { IBankAccountService } from '../../domain/interfaces/bank-account-service.interface';

@Controller('v1/bank-accounts')
export class BankAccountController {
  constructor(
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    private readonly updateBankAccountTypeValidationService: UpdateBankAccountTypeValidationService,
  ) {}

  @Get()
  getAllAccounts(): AppResponse {
    try {
      const accounts: BankAccount[] = this.iBankAccountService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank accounts retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: accounts,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No bank accounts found`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':id')
  getAccountByID(@Param('id') id: string): AppResponse {
    try {
      const account: BankAccount = this.iBankAccountService.getAccountById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank account retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `No bank account found with the given id #${id}`,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get('customer/:id')
  getAccountByCustomerID(@Param('id') customerID: string): AppResponse {
    try {
      const accounts: BankAccount[] = this.iBankAccountService.getAccountsByCustomerID(customerID);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank account retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: accounts,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Post()
  @UsePipes(CreateBankAccountValidationPipe)
  create(@Body() createBankAccountDTO: CreateBankAccountDTO): AppResponse {
    try {
      const account = this.iBankAccountService.createBankAccount(createBankAccountDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Bank account created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): AppResponse {
    try {
      this.iBankAccountService.softDeleteAccount(id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Bank account deleted successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Put(':id')
  modifyAccountType(
    @Param('id') accountId: string,
    @Body() updateBankAccountTypeDTO: UpdateBankAccountTypeDTO,
  ): AppResponse {
    try {
      this.updateBankAccountTypeValidationService.validate(updateBankAccountTypeDTO, accountId);
      const account: BankAccount = this.iBankAccountService.modifyAccountType(updateBankAccountTypeDTO, accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Account type updated successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
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
