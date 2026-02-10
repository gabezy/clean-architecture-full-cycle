import { Sequelize } from "sequelize-typescript";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import ProductModel from "../../../infra/product/repository/sequelize/model/product.model";
import ProductRepository from "../../../infra/product/repository/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

describe('unit tests for create product', () => {
  let sequelize: Sequelize;
  let repository: ProductRepositoryInterface;
  let usecase: UseCaseInterface<InputCreateProductDTO, OutputCreateProductDTO>;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel]);
    await sequelize.sync()

    repository = new ProductRepository();
    
    usecase = new CreateProductUseCase(repository);
  })
  
  
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