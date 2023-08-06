import type { 
    IApplication, 
    Request, 
    Response, 
    Next, 
    Exception 
} from '@/cores/Application'

import { ZodError } from 'zod'

type ErrorFeedback = Exception & { 
    error?: Object, 
    options? : Record<string, any> 
}

export default function( app: IApplication ){
    const errorHandler = function(
        err: ErrorFeedback, 
        req: Request, 
        res: Response, 
        next: Next
    ): void{
        if( err.error instanceof ZodError){
            return validationErrorhandler(err, res)
        }

        console.log('ini error >>>', err)
        res.status(500).json({
            message: "internal server error",
            detail: null,
            meta: null
        })
    }

    app.getInstance().use(errorHandler)
}

function validationErrorhandler(
    err: ErrorFeedback, 
    res: Response
){
    const error = err.error as ZodError

    res.status(400).json({
        message: "validation error",
        detail: error.format(),
        meta: null
    })
}