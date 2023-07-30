import type { IApplication } from '@/cores/Application'
import multer from 'multer'
import registry from './registry'

export default function( application: IApplication ){
    //tambah multer agar bisa akses multipart/form-data
    application.getInstance().use(multer().any())

    //apply registry
    registry(application)
}