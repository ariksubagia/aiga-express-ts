import type { IMiddleware } from "@/cores/Application";
import type { Request, Response, NextFunction } from "express";

export default (function( req: Request, res: Response, next: NextFunction ){
    console.log("Echo From Middleware >>> ", req.method)
    next()
}) satisfies IMiddleware