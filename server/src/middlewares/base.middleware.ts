import { Request, Response, NextFunction } from "express"

export abstract class BaseMiddleware {
  public abstract execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
