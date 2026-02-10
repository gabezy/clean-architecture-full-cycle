import ProductFactory from "../../../domain/product/factory/prodcut.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe('unit tests for update product', () => {
  const product = ProductFactory.create('a', 'Product A', 100);
  
  const mockRepository = (): ProductRepositoryInterface => {
    return {
      findById: jest.fn().mockReturnValue(Promise.resolve(product)),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    }
  }
  
  const repository = mockRepository();
  
  const usecase: UseCaseInterface<InputUpdateProductDTO, OutputUpdateProductDTO> = new UpdateProductUseCase(repository);
  
  it('should update', async () => {
    const input: InputUpdateProductDTO = {
      id: product.id,
      name: 'product changed',
      price: 300,
    };
    
    const res = await usecase.exec(input);
    
    expect(res.id).toBeDefined();
    expect(res.name).toEqual(input.name);
    expect(res.price).toEqual(input.price)
  })
})
