import { InputCreateCustomerDTO } from '../../../usecases/customer/create/create.customer.dto';
import { app, sequelize, setupDb } from '../express'
import request from 'supertest'

describe('E2E customer test', () => {
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
    const createCustomer: InputCreateCustomerDTO = {
      name: 'Jonh Doe',
      address: {
        city: 'Sao paulo',
        number: 10,
        street: 'rua',
        zip: '7231321321'
      }
    }
    
    const response = await request(app)
      .post('/customers')
      .send(createCustomer)
    
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jonh Doe');
    expect(response.body.address.city).toBe('Sao paulo');
    expect(response.body.address.number).toBe(10);
    expect(response.body.address.zip).toBe('7231321321');
    expect(response.body.address.number).toBe(10);
  });
  
  it('should not create a customer', async () => {
    const createCustomer = {
      name: 'Jonh Doe',
    }
    
    const response = await request(app)
      .post('/customers')
      .send(createCustomer)
    
    
    expect(response.statusCode).toBe(500);
  });
  
  it('should list all customers', async () => {
    const createCustomer: InputCreateCustomerDTO = {
      name: 'Jonh Doe',
      address: {
        city: 'Sao paulo',
        number: 10,
        street: 'rua',
        zip: '7231321321'
      }
    }
    
    const createCustomer2: InputCreateCustomerDTO = {
      name: 'Jonh Doe 2',
      address: {
        city: 'Sao sda',
        number: 10,
        street: 'dsadas',
        zip: '7231332131'
      }
    }
    
    const customerResponse = await request(app)
      .post('/customers')
      .send(createCustomer)
    
    expect(customerResponse.status).toBe(200);
    
    const customerResponse2 = await request(app)
      .post('/customers')
      .send(createCustomer2);
    
    expect(customerResponse2.status).toBe(200)
    
    const response = await request(app)
      .get('/customers')
      .send();
    
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe('Jonh Doe');
    expect(response.body.customers[1].name).toBe('Jonh Doe 2');
    
  })
  
})