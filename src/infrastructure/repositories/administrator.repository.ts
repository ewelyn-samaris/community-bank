import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '../../domain/entities/functionary/administrator.entity';
import { IAdministratorRepository } from '../interfaces/administrator-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AdminitratorRepository implements IAdministratorRepository {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
  ) {}

  async save(manager: Administrator): Promise<Administrator> {
    return await this.administratorRepository.save(manager);
  }

  async findAll(): Promise<Administrator[]> {
    return await this.administratorRepository.find();
  }

  async findOneByCpf(cpf: string): Promise<Administrator> {
    return await this.administratorRepository.findOne({ where: { cpf } });
  }
}
