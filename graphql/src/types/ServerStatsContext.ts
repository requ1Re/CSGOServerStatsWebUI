
import { Request, Response } from "express";
import { ServerStatsJwtPayload } from "./ServerStatsJwtPayload";

export interface ServerStatsContext {
  req: Request;
  res: Response;
  user?: ServerStatsJwtPayload;
}