import type { IApplication } from '@/cores/Application'
import multer from 'multer'
import morgan from 'morgan'
import registry from './registry'
import errors from './errors'

export default function( application: IApplication ){
    application.getInstance()
        //tambah multer agar bisa akses multipart/form-data
        .use(multer().any())
        //tambah morgan untuk logging di console
        .use(morgan("common"))

    //apply registry
    registry(application)

    return function(){
        //apply error handler
        errors(application)
    }
}