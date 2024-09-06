import { Injectable } from '@nestjs/common';
import { IObserver } from '../interfaces/observer.interface';
import { IEventManager } from '../interfaces/event-manager.interface';
import { Customer } from '../entities/customer/customer.entity';

@Injectable()
export class EventManager implements IEventManager {
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
