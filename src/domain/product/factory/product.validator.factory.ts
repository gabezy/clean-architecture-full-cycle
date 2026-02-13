import ValidatorInterface from "../../@shared/validator/validator.interface";
import BaseProduct from "../entities/product.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  
  static create(): ValidatorInterface<BaseProduct> {
    return new ProductYupValidator();
  }
  
}