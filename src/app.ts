import express, { Application, Request, Response, NextFunction } from "express";
import { AppDataSource } from "./datasources/datasource";
import { StudentRouter } from "./routers/studentRouter";
import { CustomerRouter } from "./routers/customerRouter";

class App {
  app: express.Express;
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRouter();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(500).json({
          message: "Something went wrong!!!",
        });
      }
    );
  }

  setupRouter() {
    this.app.use("/home", (req: Request, res: Response) => {
      console.log("Welcome to the Students Page!!!");
      res.status(200).send("Welcome to the Students Page!!!");
    });
    this.app.use("/student", new StudentRouter().router);
    this.app.use("/customer", new CustomerRouter().router);
  }

  public startServer() {
    const PORT: number = 3032;
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(PORT, () => {
          console.log(`Server is running in http://localhost:${PORT}`);
        });

        console.log("MongoDB server started successfully!!!");
      })
      .catch((err: any) => {
        console.log(err?.message);
      });
  }
}

const app = new App();
app.startServer();
