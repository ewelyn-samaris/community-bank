import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { StatusType } from '../../enums/status-type.enum';
import { BankAccount } from '../bank-account/bank-account.entity';
import { AccountManager } from '../functionary/account-manager.entity';
import { BeforeSoftRemove, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public nationalIdentifier: string;

  @Column()
  public name: string;

  @Column()
  public telephone: string;

  @Column()
  public address: string;

  @Column()
  public averageCapital: number;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ACTIVE })
  public status: StatusType;

  @CreateDateColumn()
  public createdAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;

  @OneToMany(() => BankAccount, (account) => account.customer, { nullable: true })
  public accounts: BankAccount[];

  @ManyToOne(() => AccountManager, (accountManager) => accountManager.customers, { eager: true })
  @JoinColumn()
  public accountManager: AccountManager;

  constructor(createCustomerDto?: CreateCustomerDTO, manager?: AccountManager) {
    if (manager) this.accountManager = manager;
    if (createCustomerDto) {
      this.nationalIdentifier = createCustomerDto?.nationalIdentifier;
      this.name = createCustomerDto?.name.toUpperCase();
      this.telephone = createCustomerDto?.telephone;
      this.address = createCustomerDto?.address.toUpperCase();
      this.averageCapital = createCustomerDto?.averageCapital;
    }
  }

  @BeforeSoftRemove()
  updateStatusBeforeSoftDelete() {
    this.status = StatusType.INACTIVE;
  }
}
