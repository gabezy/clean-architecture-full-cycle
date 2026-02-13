import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecases/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/customer.repository';
import { InputCreateCustomerDTO } from '../../../usecases/customer/create/create.customer.dto';
import ListCustomerUseCase from '../../../usecases/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  
  try {
    const createDTO: InputCreateCustomerDTO = req.body;
    const output = await usecase.exec(createDTO);
    
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  
  try {
    res.send(await usecase.exec({}));
  } catch (err) {
    res.status(500).send(err);
  }
})
