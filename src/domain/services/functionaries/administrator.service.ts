import { Inject, Injectable } from '@nestjs/common';
import { IAdministratorService } from '../../interfaces/functionary/administrator-service.interface';
import { Administrator } from '../../entities/functionary/administrator.entity';
import { IAdministratorRepository } from '../../../infrastructure/interfaces/administrator-repository.interface';

@Injectable()
export class AdministratorService implements IAdministratorService {
  constructor(
    @Inject('IAdministratorRepository') private readonly iAdministratorRepository: IAdministratorRepository,
  ) {}

  async save(administrator: Administrator): Promise<Administrator> {
    return await this.iAdministratorRepository.save(administrator);
  }

  async getAdministrators(): Promise<Administrator[]> {
    return await this.iAdministratorRepository.findAll();
  }

  async getAdministratorByCpf(cpf: string): Promise<Administrator> {
    return await this.iAdministratorRepository.findOneByCpf(cpf);
  }
}
