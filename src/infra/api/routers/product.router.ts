import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecases/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/product.repository';
import { InputCreateProductDTO } from '../../../usecases/product/create/create.product.dto';
import ListProductUseCase from '../../../usecases/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  
  try {
    const dto: InputCreateProductDTO = req.body;
    res.send(await usecase.exec(dto))
  } catch (err) {
    res.status(500).send(err)
  }
})


productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  
  try {
    res.send(await usecase.exec({}))
  } catch (err) {
    console.log({ err });
    res.status(500).send(err)
  }
})
