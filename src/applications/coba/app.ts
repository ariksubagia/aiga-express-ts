import type { IApplication } from '@/cores/Application'

import controllers from "./controllers"
import provider from './provider'

export default function( application: IApplication ){
    /**
    * APPLY PROVIDER
    */
    provider(application)

    /**
    * APPLY CONTROLLERS
    */
    controllers(application)
}