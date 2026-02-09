import {Sequelize} from 'sequelize-typescript';
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import CustomerModel from "../../../infra/customer/repository/sequelize/model/customer.model";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from './find.customer';
import Address from '../../../domain/customer/vos/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import UseCaseInterface from '../../usecase.interface';
import FindCustomerUseCase from './find.customer.usecase';

describe('Integration Test find customer user case', () => {
  
  let sequelize: Sequelize;
  let customerRepository: CustomerRepositoryInterface;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logginh: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel]);
    await sequelize.sync()

    customerRepository = new CustomerRepository();
    
    const customer = CustomerFactory.createWithAddress("jonh doe", new Address("São Paulo", 1, "77121221", "SP"));
    
    await customerRepository.create(customer);
  })
  
  it('should find customer by input', async () => {
    const id = "some id";
    
    const input: InputFindCustomerDTO = { id };
    const useCase: UseCaseInterface<any, any> = new FindCustomerUseCase(customerRepository)
    const output: OutputFindCustomerDTO = {
      id,
      name: "jonh doe",
      address: {
        street: "São Paulo",
        number: 1,
        zipcode: "77121221",
        city: "SP"
      }
    }
    
    const result: OutputFindCustomerDTO = await useCase.exec(input);
    
    expect(result).toStrictEqual(output);
  })
  
})