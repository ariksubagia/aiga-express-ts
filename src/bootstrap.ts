import type { IApplication } from '@/cores/Application'
import multer from 'multer'
import morgan from 'morgan'
import registry from './registry'
import errors from './errors'

/**
  * In this function, is the place to register plugin for express
 */
export default function( application: IApplication ){
    application.getInstance()
        //add multer to be able to parse multipart/form-data encode type
        .use(multer().any())
        //add morgan for more detail in logging
        .use(morgan("common"))

    //apply registry
    registry(application)

    return function(){
        //apply error handler
        errors(application)
    }
}