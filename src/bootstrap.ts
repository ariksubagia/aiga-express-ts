import type { IApplication } from '@/cores/Application'
import { container, Lifecycle } from 'tsyringe'
import multer from 'multer'
import morgan from 'morgan'
import registry from './registry'
import errors from './errors'
import Database from './cores/Database'

/**
  * In this function, is the place to register plugin for express
 */
export default function( application: IApplication ){
    application.getInstance()
        //add multer to be able to parse multipart/form-data encode type
        .use(multer().any())
        //add morgan for more detail in logging
        .use(morgan("common"))

    //register database as singleton
    container.register("IDatabase", { useClass: Database }, { lifecycle: Lifecycle.Singleton })

    //apply registry
    registry(application)

    return function(){
        //apply error handler
        errors(application)
    }
}