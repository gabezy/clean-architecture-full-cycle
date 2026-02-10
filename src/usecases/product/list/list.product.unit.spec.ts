import ProductFactory from "../../../domain/product/factory/prodcut.factory"
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface"
import UseCaseInterface from "../../usecase.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

describe('unit test for list Product', () => {
  const product = ProductFactory.create('a', 'Product A', 100);
  const product2 = ProductFactory.create('b', 'Product B', 100)
  
  const mockRepository = (): ProductRepositoryInterface => {
    return {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
      update: jest.fn(),
    }
  }
  
  const repository = mockRepository();
  
  const usecase: UseCaseInterface<InputListProductDTO, OutputListProductDTO> = new ListProductUseCase(repository);
  
  it('should list', async () => {
    const input: InputListProductDTO = {};
    const expected: OutputListProductDTO = {
      products: [
        { id: product.id, name: product.name, price: product.price },
        { id: product2.id, name: product2.name, price: product2.price },
      ]
    }
    
    const res = await usecase.exec(input);
    
    expect(res).toEqual(expected);
  })
  
})