import { IObserver } from './observer.interface';

export interface IEventManager {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(data: any): void;
}
