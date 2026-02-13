import { InputCreateProductDTO } from '../../../usecases/product/create/create.product.dto';
import { app, sequelize, setupDb } from '../express'
import request from 'supertest'

describe('E2E product test', () => {
  beforeAll(async () => {
    await setupDb()
  })
  
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  })
  
  afterAll(async () => {
    await sequelize.close()
  })
  
  it('should create a customer', async () => {
    const product: InputCreateProductDTO = {
      price: 10,
      name: 'smartphoe',
      type: 'a'
    }
    
    const response = await request(app)
      .post('/products')
      .send(product)
    
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('smartphoe');
    expect(response.body.price).toBe(10);
  });
  
  it('should not create a customer', async () => {
    const product = {
      name: 'teste',
    }
    
    const response = await request(app)
      .post('/products')
      .send(product)
    
    
    expect(response.statusCode).toBe(500);
  });
  
  it('should list all customers', async () => {
    const product: InputCreateProductDTO = {
      price: 10,
      name: 'smartphoe',
      type: 'a'
    }
    
    const product2: InputCreateProductDTO = {
      price: 20,
      name: 'TV',
      type: 'a'
    }
    
    const productResponse = await request(app)
      .post('/products')
      .send(product)
    
    expect(productResponse.status).toBe(200);
    
    const productResponse2 = await request(app)
      .post('/products')
      .send(product2);
    
    expect(productResponse2.status).toBe(200)
    
    const response = await request(app)
      .get('/products')
      .send();
    
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  })
  
})