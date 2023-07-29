import multer from 'multer'
import HomeController from '@/applications/controllers/HomeController'
import type { IApplication } from '@/cores/Application'

export default function( application: IApplication ){
    //tambah multer agar bisa akses multipart/form-data
    application.getInstance().use(multer().any())

    //boot sesuatu disini
    application.registerController(HomeController)
}