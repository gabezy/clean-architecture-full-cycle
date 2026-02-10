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
  })
  
})