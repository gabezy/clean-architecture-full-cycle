import BaseEntity from "../../@shared/entity/entity.base";
import EventInterface from "../../@shared/event/event.interface";
import NotificationError from "../../@shared/notification/notification.error";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import CustomerAddressChanged from "../events/customer-address-changed.event";
import CustomerCreatedEvent from "../events/customer-created.event";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../vos/address";

export default class Customer extends BaseEntity {

  private _name: string;
  private _address?: Address;
  private _activate: boolean = true;
  private _rewardPoints: number = 0;
  private _domainEvents: EventInterface[] = [];

  constructor(id: string, name: string) {
    super(id);
    
    
    this._name = name;
    this._activate = true;
    
    CustomerValidatorFactory.create().validate(this);
    
    if (this.notification.hasErrors('customer')) {
      throw new NotificationError(this.notification.getErrors());
    }

    this.addDomainEvent(new CustomerCreatedEvent(this));
  }

  get domainEvents(): EventInterface[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: EventInterface): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public get name() : string {
    return this._name
  }
  
  public set address(v : Address) {
    if (v == null || v == undefined) {
      this.notification.addError({ message: 'address can not be null', context: 'customer' })
    }

    this._address = v;
  }

  changeAddress(address: Address): void {
    this._address = address;
    this.addDomainEvent(new CustomerAddressChanged(this));
  }
  
  changeName(name: string): void {
    this._name = name;
  }
  
  public get address() : Address | undefined {
    return this._address;
  }

  public activate() {
    this._activate = true;
  }

  public deactivate() {
    this._activate = false;
  }

  public isActive() {
    return this._activate;
  }

  public addRewardPoints(points: number) {
    if (points < 0) {
      throw new Error("Cannot add negative points");
    }
    this._rewardPoints += points;
  }

  public get rewardPoints() : number {
    return this._rewardPoints;
  }
  
}
