import { Request, Response, NextFunction } from 'express';

export const LoggerFunctionalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Request from a function ...`, req.method, req.url);
  next();
};
