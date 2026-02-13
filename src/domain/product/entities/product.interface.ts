import BaseEntity from "../../@shared/entity/entity.base";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default abstract class BaseProduct extends BaseEntity {
  
  protected _name: string;
  protected _price: number;
  
  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    
    ProductValidatorFactory.create().validate(this);
    
    if (this.notification.hasErrors('product')) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
  
  public get name(): string {
    return this._name;
  }
  
  public get price(): number {
    return this._price;
  }
  
  
}