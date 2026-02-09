import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import Address from "../../../domain/customer/vos/address";
import UseCaseInterface from "../../usecase.interface";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe('Unit test for update customer usecase', () => {
  const customer = CustomerFactory.createWithAddress(
    "jonh doe",
    new Address("São Paulo", 1, "77121221", "SP"),
  );
  
  const mockRepository = (): CustomerRepositoryInterface => {
    return {
      findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    }
  }
  
  const repository: CustomerRepositoryInterface = mockRepository();
  const usecase: UseCaseInterface<InputUpdateCustomerDTO, OutputUpdateCustomerDTO> = new UpdateCustomerUseCase(repository);
  
  it('should update the customer', async () => {
    const id = 'some id';
    const input: InputUpdateCustomerDTO = {
      id,
      name: 'teste',
      address: {
        city: 'vancouver',
        street: 'some street',
        number: 10,
        zip: '88321321'
      }
    }
    
    const res = await usecase.exec(input);
    
    expect(res).toEqual(input)
  })
  
})