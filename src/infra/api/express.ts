import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/model/customer.model";
import ProductModel from "../product/repository/sequelize/model/product.model";
import { customerRoute } from "./routers/customer.router";
import { productRoute } from "./routers/product.router";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;
app.use("/customers", customerRoute);
app.use("/products", productRoute);

export async function setupDb() {
  try {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Database setup failed:", error);
    throw error;
  }
}
