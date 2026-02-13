import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/prodcut.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from "./update.product.dto";
import ProductModel from "../../../infra/product/repository/sequelize/model/product.model";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductInterface from "../../../domain/product/entities/product.interface";
import Product from "../../../domain/product/entities/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration tests for update product", () => {
  let sequelize: Sequelize;
  let repository: ProductRepositoryInterface;
  let usecase: UseCaseInterface<InputUpdateProductDTO, OutputUpdateProductDTO>;
  let product: ProductInterface;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });

    repository = new ProductRepository();

    product = ProductFactory.create("a", "Product A", 100);

    await repository.create(product as Product);
    usecase = new UpdateProductUseCase(repository);
  });

  afterEach(async () => {
    if (sequelize) {
      await sequelize.close();
    }
  });

  it("should update", async () => {
    const input: InputUpdateProductDTO = {
      id: product.id,
      name: "product changed",
      price: 300,
    };

    const res = await usecase.exec(input);

    expect(res.id).toBeDefined();
    expect(res.name).toEqual(input.name);
    expect(res.price).toEqual(input.price);
  });
});
