import type { Request, Response, Next, IMiddleware, RequestWithValidated } from './Application'
import { z, type ZodTypeAny } from 'zod'

type OptionsType = {
    message? : string | Function
}

export function ValidatorMiddleware<T extends ZodTypeAny>(schema: T, options? : OptionsType) {
    const middleware: IMiddleware<RequestWithValidated<z.infer<T>>> = async (
        req: RequestWithValidated<z.infer<T>>, 
        res: Response, 
        next: Next
    ) => {
        try{
            const result = await schema.parseAsync({ ...req.body, ...req.files })
            req.validated = result
            next()
        }catch( e ){
            if( e instanceof z.ZodError ){
                return next({
                    error : e,
                    options
                })
            }

            next(e)
        }
    }
    
    return middleware
}