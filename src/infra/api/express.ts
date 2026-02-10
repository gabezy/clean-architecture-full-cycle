import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/model/customer.model";
import { customerRoute } from "./routers/customer.router";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;
app.use('/customers', customerRoute);

export async function setupDb() {
  try {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}
