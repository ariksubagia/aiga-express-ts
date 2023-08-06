import type { IApplication } from '@/cores/Application'

import HomeController from '@/applications/coba/controllers/HomeController'

export default function( app: IApplication ){
    /**
     * REGISTER CONTROLLER
     */
    app.registerController(HomeController)
}