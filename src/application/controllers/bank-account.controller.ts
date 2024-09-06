import { Controller, UsePipes, HttpStatus } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreateBankAccountDTO } from '../dtos/create-bank-account.dto';
import { BankAccountService } from '../../domain/services/bank-account.service';
import { DataFormatterAdapter } from '../../infrastructure/adapters/formatDateTime.adapter';
import { CreateBankAccountValidationPipe } from '../validators/create-bank-account-validation.pipe';
import { UpdateBankAccountTypeDTO } from '../dtos/update-bank-account.dto';
import { UpdateBankAccountTypeValidationService } from '../../domain/validators/update-bank-account-type-validation.service';
import { BankAccount } from '../../domain/entities/bank-account.entity';

@Controller('v1/bank-accounts')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
    private readonly updateBankAccountTypeValidationService: UpdateBankAccountTypeValidationService,
  ) {}

  @Get()
  getAllAccounts(): AppResponse {
    try {
      const accounts: BankAccount[] = this.bankAccountService.getAllBankAccounts();
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank accounts retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: accounts,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't retrieve bank accounts. Internal server error");
    }
  }

  @Get(':id')
  getAccountByID(@Param('id') id: string): AppResponse {
    try {
      const account: BankAccount = this.bankAccountService.getAccountById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank account retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
      };
    } catch (error) {
      throw new NotFoundException(`Not found bank account with the given accountID #${id}`);
    }
  }

  @Get('customer/:id')
  getAccountByCustomerID(@Param('id') customerID: string): AppResponse {
    try {
      const accounts: BankAccount[] = this.bankAccountService.getAccountsByCustomerID(customerID);
      return {
        statusCode: HttpStatus.OK,
        message: 'Bank account retrieved successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: accounts,
      };
    } catch (error) {
      throw new NotFoundException(`Not found bank account with the given accountID #${customerID}`);
    }
  }

  @Post()
  @UsePipes(CreateBankAccountValidationPipe)
  create(@Body() createBankAccountDTO: CreateBankAccountDTO): AppResponse {
    try {
      console.log(`createBankAccountDTO no controller: ${JSON.stringify(createBankAccountDTO)}`);
      const account = this.bankAccountService.createBankAccount(createBankAccountDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Bank account created successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't create bank account. Internal server error");
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): AppResponse {
    try {
      this.bankAccountService.softDeleteAccount(id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Bank account deleted successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't delete bank account. Internal server error");
    }
  }

  @Put(':id')
  modifyAccountType(
    @Param('id') accountId: string,
    @Body() updateBankAccountTypeDTO: UpdateBankAccountTypeDTO,
  ): AppResponse {
    try {
      this.updateBankAccountTypeValidationService.validate(updateBankAccountTypeDTO, accountId);
      const account: BankAccount = this.bankAccountService.modifyAccountType(updateBankAccountTypeDTO, accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Account type updated successfully',
        date: DataFormatterAdapter.formatDateTimeString(),
        data: account,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can't update account type. Internal server error");
    }
  }
}
