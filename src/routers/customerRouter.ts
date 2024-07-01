import express from "express";
import {
  CustomerMiddleware,
  CustomerUpdateMiddleware,
} from "../middlewares/customerMiddleware";
import { CustomerController } from "../controllers/customerController";

export class CustomerRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.customerRouter();
  }
  customerRouter() {
    this.router.post(
      "/",
      CustomerMiddleware,
      CustomerController.createNewCustomer
    );
    this.router.get("/", CustomerController.getAllCustomer);
    this.router.get("/:id", CustomerController.getCustomerById);
    this.router.put(
      "/:id",
      CustomerUpdateMiddleware,
      CustomerController.updateCustomerById
    );
    this.router.delete("/:id", CustomerController.deleteCustomerById);
  }
}
