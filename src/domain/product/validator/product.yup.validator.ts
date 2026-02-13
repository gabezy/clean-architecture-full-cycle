import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from 'yup';
import BaseProduct from "../entities/product.interface";

export default class ProductYupValidator implements ValidatorInterface<BaseProduct> {
  
  validate(entity: BaseProduct): void {
    try {
      yup.object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().positive('Price must be greater than zero'),
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price,
        }, { abortEarly: false })
    } catch (err) {
      const errors = err as yup.ValidationError;
      errors.errors.forEach(e => {
        entity.notification.addError({ context: 'product', message: e })
      })
    }
  }
  
}