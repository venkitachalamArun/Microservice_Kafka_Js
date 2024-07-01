import express from "express";

export const StudentsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`we get ${req.body} and ${req.params.id}`);
  console.log("Request intercepted by POST studentsMiddleware");
  next();
};

export const StudentsUpdateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`we get ${req.body} and ${req.params.id}`);
  console.log("Request intercepted by Update studentsMiddleware");
  next();
};
