import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import Address from "../../../domain/customer/vos/address";
import UseCaseInterface from "../../usecase.interface";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUseCase implements UseCaseInterface<InputUpdateCustomerDTO, OutputUpdateCustomerDTO> {
  
  private repository: CustomerRepositoryInterface;
  
  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const { address } = input;
    
    const customer = await this.repository.findById(input.id);
    customer.changeName(input.name);
    customer.changeAddress(new Address(address.street, address.number, address.zip, address.city))
    
    await this.repository.update(customer);
    
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