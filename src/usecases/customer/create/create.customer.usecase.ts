import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import Address from "../../../domain/customer/vos/address";
import UseCaseInterface from "../../usecase.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";

export default class CreateCustomerUseCase implements UseCaseInterface<InputCreateCustomerDTO, OutputCreateCustomerDTO> {
  
  private repository: CustomerRepositoryInterface;
  
  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const { address } = input;
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(address.street, address.number, address.zip, address.city)
    );
    
    console.log(customer);
    
    await this.repository.create(customer);
    
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address?.street ?? '',
        number: customer.address?.number ?? -1,
        zip: customer.address?.zip ?? '',
        city: customer.address?.city ?? '',
      }
    }
  }
  
}