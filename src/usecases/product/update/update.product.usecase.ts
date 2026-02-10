import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { OutputCreateProductDTO } from "../create/create.product.dto";
import { InputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase implements UseCaseInterface<InputUpdateProductDTO, OutputCreateProductDTO> {
  
  private repository: ProductRepositoryInterface;
  
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputUpdateProductDTO): Promise<OutputCreateProductDTO> {
    const productModel = await this.repository.findById(input.id);
    
    productModel.changeName(input.name)
    productModel.changePrice(input.price);
    
    await this.repository.update(productModel);
    
    return {
      id: productModel.id,
      name: productModel.name,
      price: productModel.price
    }
  }
  
}