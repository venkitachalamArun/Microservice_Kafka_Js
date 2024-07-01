import express from "express";

export const CustomerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`we get ${req.body} and ${req.params.id}`);
  console.log("Request intercepted by POST customerMiddleware");
  next();
};

export const CustomerUpdateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`we get ${req.body} and ${req.params.id}`);
  console.log("Request intercepted by UPDATE customerMiddleware");
  next();
};
