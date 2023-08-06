import { injectable, inject} from "tsyringe"

import type { Request, Response } from '@/cores/Application'
import { Controller } from "@/cores/Application"
import { ValidatorMiddleware } from "@/cores/Middlewares"

import type { ICobaService } from "@/applications/coba/types"
import cobaMiddleware from "@/applications/coba/middlewares/cobaMiddleware"
import CobaValidator, { type SchemaType as ValidatedType } from "@/applications/coba/validators/CobaValidator"

@injectable()
@Controller("/", [cobaMiddleware ])
export default class HomeController {
    constructor(
        @inject("ICobaService") private readonly cobaService: ICobaService
    ){}

    @Controller.GET("/")
    public list(req: Request, res: Response){
        res.json({
            message: "hello world",
            detail: null,
            meta: null
        })
    }

    @Controller.POST("/", [ ValidatorMiddleware<typeof CobaValidator>(CobaValidator) ])
    public create(req: {validated: ValidatedType} & Request, res: Response){
        console.log(req.validated)

        res.json({
            message: "data berhasil disimpan",
            detail: this.cobaService.createCoba(req.validated),
            meta: null
        })
    }

    @Controller.PUT("/:id")
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