import { injectable, inject} from "tsyringe"

import type { Request, Response } from '@/cores/Application'
import { Controller } from "@/cores/Application"
import { ValidatorMiddleware } from "@/cores/Middlewares"

import type { ICobaService } from "@/applications/coba/types"
import cobaMiddleware from "@/applications/coba/middlewares/cobaMiddleware"
import CobaValidator, { type SchemaType as ValidatedType } from "@/applications/coba/validators/CobaValidator"

/**
 * Controller used for handle group of route, by using Controller decorators.
 * Middleware, service, serializer, and validator will be called here.
 * avoid calling repository directly in controller.
 * avoid writing application logic in controller, all logic should be written in service (for easier code testing and mocking).
 * avoid writing validation directly in controller, all validation should be writen in either validator schema or custom middleware.
 * avoid calling service directly, use dependency injector (such as: tsyringe) to orchestrate service and factory. the reason, to minimalize coupling.
 * register controller in controllers.ts to make it active
 */

@injectable()
@Controller("/", [ cobaMiddleware ])
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