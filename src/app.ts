import express from "express";
import { useExpressServer } from "routing-controllers";
import { axiosController } from "./controllers/axiosController";

class App {
  app: any;
  constructor() {
    this.app = express();
    this.setupRoutes();
    this.middleware();
  }

  setupRoutes() {
    useExpressServer(this.app, {
      controllers: [axiosController],
    });
  }
  middleware() {
    this.app.use(express.json());
  }

  start() {
    this.app.listen(4000, () => {
      console.log("Server Started on 4000");
    });
  }
}

const app = new App();
app.start();
