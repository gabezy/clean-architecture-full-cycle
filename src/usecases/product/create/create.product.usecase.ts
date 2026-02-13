import Product from "../../../domain/product/entities/product";
import ProductFactory from "../../../domain/product/factory/prodcut.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class CreateProductUseCase implements UseCaseInterface<InputCreateProductDTO, OutputCreateProductDTO> {
  
  private repository: ProductRepositoryInterface;
  
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }
  
  async exec(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const { type, name, price } = input;
    const product = ProductFactory.create(type, name, price);
    
    await this.repository.create(product as Product);
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
  
}