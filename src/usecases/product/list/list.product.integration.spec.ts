import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/prodcut.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";
import ProductInterface from "../../../domain/product/entities/product.interface";
import ProductModel from "../../../infra/product/repository/sequelize/model/product.model";
import ProductRepository from "../../../infra/product/repository/product.repository";
import Product from "../../../domain/product/entities/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test for list Product", () => {
  let sequelize: Sequelize;
  let repository: ProductRepositoryInterface;
  let usecase: UseCaseInterface<InputListProductDTO, OutputListProductDTO>;
  let product: ProductInterface;
  let product2: ProductInterface;

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
    product2 = ProductFactory.create("b", "Product B", 100);

    await repository.create(product as Product);
    await repository.create(product2 as Product);

    usecase = new ListProductUseCase(repository);
  });

  afterEach(async () => {
    if (sequelize) {
      await sequelize.close();
    }
  });

  it("should list", async () => {
    const input: InputListProductDTO = {};
    const expected: OutputListProductDTO = {
      products: [
        { id: product.id, name: product.name, price: product.price },
        { id: product2.id, name: product2.name, price: product2.price },
      ],
    };

    const res = await usecase.exec(input);

    expect(res.products.length).toBe(2);
    expect(res.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: product.id,
          name: product.name,
          price: product.price,
        }),
        expect.objectContaining({
          id: product2.id,
          name: product2.name,
          price: product2.price,
        }),
      ]),
    );
  });
});
