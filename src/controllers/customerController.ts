import { Request, Response } from "express";
import { AppDataSource } from "../datasources/datasource";
import { Customer } from "../models/customer";

export class CustomerController {
  static async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const selectedCustomer = await AppDataSource.manager.findOneBy(Customer, {
        id: id as any,
      });
      if (!selectedCustomer) {
        res.status(404).json({
          status: "Failed",
          error: "Customer Not found",
        });
        return;
      }
      res.status(200).json({
        status: "Successful",
        data: selectedCustomer,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async updateCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AppDataSource.manager.update(Customer, { id: id }, req.body);
      const updatedCustomer = await AppDataSource.manager.findOneBy(Customer, {
        id: id as any,
      });
      if (!updatedCustomer) {
        res.status(404).json({
          status: "Failed",
          error: "Customer Not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        data: updatedCustomer,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async deleteCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deteltedCustomer = await AppDataSource.manager.delete(Customer, {
        id: id,
      });
      if (deteltedCustomer.affected === 0) {
        res.status(404).json({
          status: "Failed",
          error: "Customer not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        message: "Customer deleted successfully",
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async getAllCustomer(req: Request, res: Response) {
    try {
      const allCustomer = await AppDataSource.manager.find(Customer);
      res.status(200).json({
        status: "Successfully retrived the Customer Details",
        data: allCustomer,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async createNewCustomer(req: Request, res: Response) {
    const { id, custName, custAge, custEmail } = req.body;
    try {
      const customerData = await AppDataSource.manager.insert(Customer, {
        id,
        custName,
        custAge,
        custEmail,
      });

      console.log("*********Created Student*********", customerData);
      await AppDataSource.manager.save(customerData);

      res.status(200).send(customerData);
    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
}
