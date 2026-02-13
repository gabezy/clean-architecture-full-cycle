import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer";
import Address from "../../../domain/customer/vos/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UseCaseInterface from "../../usecase.interface";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Unit Test find customer user case", () => {
  const customer = CustomerFactory.createWithAddress(
    "jonh doe",
    new Address("São Paulo", 1, "77121221", "SP"),
  );

  const mockRepository = (): CustomerRepositoryInterface => {
    return {
      findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  let sequelize: Sequelize;
  let customerRepository: CustomerRepositoryInterface;

  beforeAll(() => {
    customerRepository = mockRepository();
  });

  it("should find customer by input", async () => {
    const id = customer.id;

    const input: InputFindCustomerDTO = { id };
    const useCase: UseCaseInterface<
      InputFindCustomerDTO,
      OutputFindCustomerDTO
    > = new FindCustomerUseCase(customerRepository);
    const output: OutputFindCustomerDTO = {
      id,
      name: "jonh doe",
      address: {
        street: "São Paulo",
        number: 1,
        zipcode: "77121221",
        city: "SP",
      },
    };

    const result: OutputFindCustomerDTO = await useCase.exec(input);

    expect(result).toStrictEqual(output);
  });

  it("Should not find a customer", async () => {
    const id = "some id";

    const input: InputFindCustomerDTO = { id };
    const useCase: UseCaseInterface<any, any> = new FindCustomerUseCase(
      customerRepository,
    );

    customerRepository.findById = jest
      .fn()
      .mockRejectedValue(new Error("Customer not found"));

    await expect(useCase.exec(input)).rejects.toThrow();
  });
});
