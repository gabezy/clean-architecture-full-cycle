import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface"
import UseCaseInterface from "../../usecase.interface"
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto"
import CreateCustomerUseCase from "./create.customer.usecase"

describe('Unit tests for create custormer', () => {
  const mockRepository = (): CustomerRepositoryInterface => {
    return {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    }
  }
  
  const repository: CustomerRepositoryInterface = mockRepository();
  const usecase: UseCaseInterface<InputCreateCustomerDTO, OutputCreateCustomerDTO> = new CreateCustomerUseCase(repository);
  
  it('should create a new user', async () => {
    const input: InputCreateCustomerDTO = {
      name: "Jonh",
      address: {
        city: "Belo Horizonte",
        number: 10,
        street: "Alameda bom fim",
        zip: "82231-322"
      }
    }
    
    const result = await usecase.exec(input);
    
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.address).toEqual(input.address);
  })
  
})