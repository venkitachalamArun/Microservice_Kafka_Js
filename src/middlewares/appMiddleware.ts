import { NextFunction, Request, Response } from "express";
import {
  ExpressMiddlewareInterface,
  Middleware,
  Req,
  Res,
} from "routing-controllers";

@Middleware({ type: "before" })
export class AppMiddleware implements ExpressMiddlewareInterface {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    const accessToken = req.headers["access-token"];
    if (!accessToken || accessToken[0].trim() === "") {
      return res.status(400).json({ error: "AccessToken missing or empty" });
    }

    //If AccessToken is present, continue to the next middleware or route handler
    next();
  }
}
