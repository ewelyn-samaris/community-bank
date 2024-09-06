import { Customer } from '../entities/customer/customer.entity';

export interface IObserver {
  update(customer: Customer): void;
}
