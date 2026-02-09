import ProductFactory from "../../../domain/product/factory/prodcut.factory"
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface"
import UseCaseInterface from "../../usecase.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe('unit test for find Product', () => {
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
  
  const usecase: UseCaseInterface<InputFindProductDTO, OutputFindProductDTO> = new FindProductUseCase(repository);
  
  it('should find by id', async () => {
    const id = 'some id';
    
    const input: InputFindProductDTO = { id };
    const expected: OutputFindProductDTO = {
      id: product.id,
      name: product.name,
      price: product.price
    }
    
    const res = await usecase.exec(input);
    
    expect(res).toEqual(expected);
  })
  
  it('should throw error if product does not exists', async () => {
    const id = "some id";

    const input: InputFindProductDTO = { id };

    repository.findById = jest
      .fn()
      .mockRejectedValue(new Error("Product not found"));

    await expect(usecase.exec(input)).rejects.toThrow();
  })
  
})