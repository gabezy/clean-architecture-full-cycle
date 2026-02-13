import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe('unit tests for create product', () => {
  const mockRepository = (): ProductRepositoryInterface => {
    return {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    }
  }
  
  const repository = mockRepository();
  
  const usecase: UseCaseInterface<InputCreateProductDTO, OutputCreateProductDTO> = new CreateProductUseCase(repository);
  
  it('should create', async () => {
    const input: InputCreateProductDTO = {
      name: 'product test',
      price: 100,
      type: "b"
    };
    
    const res = await usecase.exec(input);
    
    expect(res.id).toBeDefined();
    expect(res.name).toEqual(input.name);
    expect(res.price).toEqual(input.price * 2)
  })
})