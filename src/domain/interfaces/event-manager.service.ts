import { Injectable } from '@nestjs/common';
import { IObserver } from './observer.interface';
import { IEventManager } from './event-manager.interface';
import { Customer } from '../entities/customer/customer.entity';

@Injectable()
export class EventManagerService implements IEventManager {
  private observers: IObserver[] = [];

  subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(customer: Customer): void {
    this.observers.forEach((observer) => observer.update(customer));
  }
}
