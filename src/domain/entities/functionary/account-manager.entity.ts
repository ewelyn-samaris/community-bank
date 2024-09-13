import { ManagedRegion } from '../../enums/managed-regions.enum';
import { Functionary } from './functionary.entity';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { Column, Entity, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity('account_managers')
export class AccountManager extends Functionary {
  @Column({ type: 'enum', enum: ManagedRegion })
  managedRegion: ManagedRegion;

  @OneToMany(() => Customer, (customer) => customer.accountManager, { nullable: true, eager: true })
  customers?: Customer[];

  constructor(createAccountManagerDto?: CreateFunctionaryDTO) {
    super(createAccountManagerDto);
    if (createAccountManagerDto) this.managedRegion = createAccountManagerDto?.managedRegion;
  }
}
