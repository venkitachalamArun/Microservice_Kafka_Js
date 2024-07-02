import "reflect-metadata";
import axios from "axios";
import { Request, Response } from "express";
import { Get, JsonController, Req, Res } from "routing-controllers";
import { produceMessage } from "../kafka/producer";

@JsonController()
export class axiosController {
  @Get("/fetchItems")
  async getAllProducts(@Req() req: Request, @Res() res: Response) {
    const response = await axios.get(
      "https://mpbae282551b945eabb6.free.beeceptor.com/data"
    );
    const data = response.data;

    // Send data to Kafka
    await produceMessage(data);
    return res.send({ status: "success", data: data });
  }
}
