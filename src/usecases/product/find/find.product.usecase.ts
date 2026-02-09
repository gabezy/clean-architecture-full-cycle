import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase implements UseCaseInterface<InputFindProductDTO, OutputFindProductDTO> {
  
  private repository: ProductRepositoryInterface;
  
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const { id, name, price } = await this.repository.findById(input.id);
    
    return {
      id,
      name,
      price
    }
  }
  
}