import { Injectable } from '@nestjs/common';
import { IAdministratorService } from '../../interfaces/functionary/administrator-service.interface';
import { Administrator } from '../../entities/functionary/administrator.entity';

@Injectable()
export class AdministratorService implements IAdministratorService {
  getAdministrators(): Administrator[] {
    return Administrator.administrators;
  }
}
