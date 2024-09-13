import { Inject } from '@nestjs/common';
import { Customer } from '../entities/customer/customer.entity';
import { AccountType } from '../enums/account-type.enum';
import { SavingAccountFactory } from '../factories/bank-account/saving-account.factory';
import { IEventManager } from '../interfaces/event-manager.interface';
import { IObserver } from '../interfaces/observer.interface';
import { IBankAccountService } from '../interfaces/bank-account-service.interface';
import { ICustomerService } from '../interfaces/customer-service.interface';

export class SavingAccountObserverService implements IObserver {
  constructor(
    @Inject('IEventManager') private readonly iEventManager: IEventManager,
    @Inject('IBankAccountService') private readonly iBankAccountService: IBankAccountService,
    @Inject('ICustomerService') private readonly iCustomerService: ICustomerService,
  ) {}

  async update(customer: Customer): Promise<void> {
    const createSavingAccountDto = { customerId: customer.id, accountType: AccountType.SAVING_ACCOUNT };
    const savingAccount = SavingAccountFactory.create(createSavingAccountDto, customer);
    await this.iBankAccountService.save(savingAccount);
    customer.accounts.push(savingAccount);
    await this.iCustomerService.save(customer);
    this.iEventManager.unsubscribe(this);
  }
}
