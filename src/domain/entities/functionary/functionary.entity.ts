import { StatusType } from '../../enums/status-type.enum';
import { OfficeTypes } from '../../enums/office-types.enum';
import { CreateFunctionaryDTO } from '../../../application/dtos/create-functionary.dto';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Functionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  admittedOn: Date;

  @Column()
  salary: number;

  @Column({ type: 'enum', enum: OfficeTypes })
  office: OfficeTypes;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ACTIVE })
  status: StatusType;

  @Column({ nullable: true })
  dismissedOn?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(createFunctionaryDTO?: CreateFunctionaryDTO) {
    if (createFunctionaryDTO) {
      this.cpf = createFunctionaryDTO?.cpf;
      this.name = createFunctionaryDTO?.name.toUpperCase();
      this.office = createFunctionaryDTO?.office;
      this.salary = createFunctionaryDTO?.salary;
      this.admittedOn = new Date(createFunctionaryDTO?.admittedOn);
    }
  }
}
