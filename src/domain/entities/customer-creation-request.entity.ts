import { RequestStatus } from '../enums/request-status.enum';
import { ManagedRegion } from '../enums/managed-regions.enum';
import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_creation_requests')
export class CustomerCreationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nationalIdentifier: string;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  averageCapital: number;

  @Column({ type: 'enum', enum: ManagedRegion })
  region: ManagedRegion;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  responseDate?: Date;

  constructor(customerCreationRequestDTO?: CreateCustomerDTO) {
    if (customerCreationRequestDTO) {
      this.nationalIdentifier = customerCreationRequestDTO?.nationalIdentifier;
      this.name = customerCreationRequestDTO?.name.toUpperCase();
      this.telephone = customerCreationRequestDTO?.telephone;
      this.averageCapital = customerCreationRequestDTO?.averageCapital;
      this.address = customerCreationRequestDTO?.address.toUpperCase();
      this.region = customerCreationRequestDTO?.region;
    }
  }
}
