import { Inject, Injectable } from '@nestjs/common';
import { SavingAccount } from '../../entities/bank-account/saving-account.entity';
import { SavingAccountFactory } from '../../factories/bank-account/saving-account.factory';
import { AccountType } from '../../enums/account-type.enum';
import { IObserver } from '../../interfaces/observer.interface';
import { Customer } from '../../entities/customer/customer.entity';
import { IEventManager } from '../../interfaces/event-manager.interface';

@Injectable()
export class SavingAccountService implements IObserver {
  constructor(
    @Inject('IEventManager') private readonly iEventManager: IEventManager
  ) {}
  getAll(): SavingAccount[] {
    return SavingAccount.savings;
  }

  update(customer: Customer): void {
    const createSavingAccountDto = { customerId: customer.id, accountType: AccountType.SAVING_ACCOUNT };
    const savingAccount = SavingAccountFactory.create(createSavingAccountDto);
    customer.accountsIds.push(savingAccount.id);
    this.iEventManager.unsubscribe(this);
  }
}
