import Product from "../entities/product";
import ProductB from "../entities/product-b";
import ProductInterface from "../entities/product.interface";
import { v4 as uuid } from 'uuid'

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number,
  ): ProductInterface {
    const productType = type.trim().toLowerCase();
    const id = uuid()

    switch (productType) {
      case "a":
        return new Product(id, name, price);
      case "b":
        return new ProductB(id, name, price);
      default:
        throw new Error("Product for " + type + " not implemented yet");
    }
  }
}
