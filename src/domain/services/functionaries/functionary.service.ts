import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { IFunctionaryService } from '../../interfaces/functionary/functionary-service.interface';
import { IAccountManagerService } from '../../interfaces/functionary/account-manager-service.interface';
import { IAdministratorService } from '../../interfaces/functionary/administrator-service.interface';
import { FunctionaryFactory } from '../../factories/functionary/functionary.factory';
import { Functionary } from '../../entities/functionary/functionary.entity';
import { Administrator } from '../../entities/functionary/administrator.entity';
import { AccountManager } from '../../entities/functionary/account-manager.entity';

@Injectable()
export class FunctionaryService implements IFunctionaryService {
  constructor(
    @Inject('IAdministratorService') private readonly iAdministratorService: IAdministratorService,
    @Inject('IAccountManagerService') private readonly iAccountManagerService: IAccountManagerService,
  ) {}

  private async save(functionary: Functionary): Promise<Functionary> {
    if (functionary instanceof AccountManager) {
      return await this.iAccountManagerService.save(functionary);
    }
    return await this.iAdministratorService.save(functionary);
  }

  async getFunctionaries(): Promise<Functionary[]> {
    const administrators: Administrator[] = await this.iAdministratorService.getAdministrators();
    const managers: AccountManager[] = await this.iAccountManagerService.getManagers();
    const functionaries = [...administrators, ...managers];
    if (!functionaries.length) {
      throw new NotFoundException(`No functionary found in the database`);
    }
    return functionaries;
  }

  async getFunctionaryByCpf(cpf: string): Promise<Functionary> {
    let functionary: Functionary = await this.iAccountManagerService.getManagerByCpf(cpf);
    if (functionary) return functionary;

    functionary = await this.iAdministratorService.getAdministratorByCpf(cpf);

    if (!functionary) {
      throw new NotFoundException(`No functionary found for the given cpf #${cpf}`);
    }
    return functionary;
  }

  async createFunctionary(createFunctionaryDTO: CreateFunctionaryDTO): Promise<Functionary> {
    try {
      const functionary = FunctionaryFactory.createFunctionary(createFunctionaryDTO);
      return await this.save(functionary);
    } catch (error) {
      throw new InternalServerErrorException(`Cant create functionary. Internal Server Error: ${error}`);
    }
  }
}
