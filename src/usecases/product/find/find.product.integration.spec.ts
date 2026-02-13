import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/prodcut.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infra/product/repository/sequelize/model/product.model";
import ProductRepository from "../../../infra/product/repository/product.repository";
import Product from "../../../domain/product/entities/product";
import BaseProduct from "../../../domain/product/entities/product.interface";

describe("integration test for find Product", () => {
  let sequelize: Sequelize;
  let repository: ProductRepositoryInterface;
  let usecase: UseCaseInterface<InputFindProductDTO, OutputFindProductDTO>;
  let product: BaseProduct;

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
    usecase = new FindProductUseCase(repository);
  });

  afterEach(async () => {
    if (sequelize) {
      await sequelize.close();
    }
  });

  it("should find by id", async () => {
    const input: InputFindProductDTO = { id: product.id };
    const expected: OutputFindProductDTO = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const res = await usecase.exec(input);

    expect(res).toEqual(expected);
  });

  it("should throw error if product does not exists", async () => {
    const id = "dsadasda";

    const input: InputFindProductDTO = { id };

    repository.findById = jest
      .fn()
      .mockRejectedValue(new Error("Product not found"));

    await expect(usecase.exec(input)).rejects.toThrow();
  });
});
