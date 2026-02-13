import NotificationError from "../../@shared/notification/notification.error";
import BaseProduct from "./product.interface";

export default class ProductB extends BaseProduct {


  constructor(id: string, name: string, price: number) {
    super(id, name, price * 2);
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notification.addError({ message: 'Id is required', context: 'product' });
    }
    if (this._name.length === 0) {
      this.notification.addError({ message: 'Name is required', context: 'product' });
    }
    if (this._price < 0) {
      this.notification.addError({ message: 'Price must be greater than zero', context: 'product' });
    }
    
    if (this.notification.hasErrors('product')) {
      throw new NotificationError(this.notification.getErrors());
    }
    
    return true;
  }
}
