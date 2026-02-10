import Product from "../../../domain/product/entities/product";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase implements UseCaseInterface<InputListProductDTO, OutputListProductDTO> {
  
  private repository: ProductRepositoryInterface;
  
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.repository.findAll();
    return this.map2DTO(products);
  }
  
  private map2DTO(products: Product[]): OutputListProductDTO {
    return {
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price
      }))
    }
  }
  
}