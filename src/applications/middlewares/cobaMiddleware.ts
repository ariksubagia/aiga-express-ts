import type { IMiddleware } from "@/cores/Application";
import type { Request, Response, NextFunction } from "express";

export default (function( req: Request, res: Response, next: NextFunction ){
    console.log("CROOOOT !", req.method)
    next()
}) satisfies IMiddleware