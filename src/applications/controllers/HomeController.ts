import { autoInjectable } from "tsyringe"
import type { Request, Response } from 'express'
import { Controller } from "@/cores/Application"
import cobaMiddleware from "@/applications/middlewares/cobaMiddleware"
import CobaService from "@/applications/services/CobaService"

@autoInjectable()
@Controller("/")
export default class HomeController {
    constructor(private readonly cobaService: CobaService){}

    @Controller.GET("/")
    public list(req: Request, res: Response){
        res.json({
            message: "hello world",
            detail: null,
            meta: null
        })
    }

    @Controller.POST("/", [ cobaMiddleware ])
    public create(req: Request, res: Response){
        res.json({
            message: "data berhasil disimpan",
            detail: this.cobaService.createCoba(req.body),
            meta: null
        })
    }

    @Controller.PUT("/:id", [ cobaMiddleware ])
    public update(req: Request, res: Response){
        res.json({
            message: `data berhasil diubah id(${req.params.id})`,
            detail: this.cobaService.createCoba(req.body),
            meta: null
        })
    }

    @Controller.DELETE("/:id")
    public delete(req: Request, res: Response){
        res.json({
            message: `data berhasil dihapus id(${req.params.id})`,
            detail: null,
            meta: null
        })
    }
}