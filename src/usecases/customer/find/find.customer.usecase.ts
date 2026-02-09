import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer";

export default class FindCustomerUseCase implements UseCaseInterface<InputFindCustomerDTO, OutputFindCustomerDTO> {
  
  private repository: CustomerRepositoryInterface;
  
  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.repository.findById(input.id);
    const address = customer.address;
    
    if (address) {
      return {
         id: customer.id,
         name: customer.name,
         address: {
           city: address.city,
           number: address.number,
           street: address.street,
           zipcode: address.zip
         }
       }
    }
    
    return {
      id: customer.id,
      name: customer.name,
    }
  }
  
}